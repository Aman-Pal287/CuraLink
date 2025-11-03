import React, { useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function AddPublication() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [source, setSource] = useState("");
  const [link, setLink] = useState("");
  const [abstract, setAbstract] = useState("");
  const [aiSummary, setAiSummary] = useState("");
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [err, setErr] = useState("");

  // AI: generate summary from abstract
  const handleGenerateSummary = async () => {
    if (!abstract.trim()) return alert("Please add abstract text first");
    setAiLoading(true);
    try {
      const res = await api.post("/ai/summarize", { text: abstract });
      // backend returns { summary: "..." }
      setAiSummary(res.data.summary || res.data);
    } catch (e) {
      console.error(e);
      setErr("AI summary failed");
    } finally {
      setAiLoading(false);
    }
  };

  // AI: extract tags
  const handleExtractTags = async () => {
    if (!abstract.trim()) return alert("Please add abstract text first");
    setAiLoading(true);
    try {
      const res = await api.post("/ai/extract-conditions", { text: abstract });
      // backend returns { tags: [...] } or []
      const out = res.data.tags || res.data;
      setTags(Array.isArray(out) ? out : []);
    } catch (e) {
      console.error(e);
      setErr("AI tags failed");
    } finally {
      setAiLoading(false);
    }
  };

  // Auto-fill from link (simple): backend might not have scraper; we'll call backend /publications?link=...
  const handleAutofillFromLink = async () => {
    if (!link.trim()) return alert("Paste a publication link first");
    setAiLoading(true);
    try {
      // If backend implements scrapper: /api/publications/fetch-from-link (optional)
      // For now we'll attempt requesting the link and let AI summarize — naive approach:
      const res = await api.post("/ai/summarize", { text: link }); // works only if backend handles fetching; otherwise skip
      if (res.data.summary) setAiSummary(res.data.summary);
    } catch (e) {
      console.error(e);
      setErr("Auto-fill failed");
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setLoading(true);
    setErr("");
    try {
      const body = {
        title,
        authors: authors
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        source,
        link,
        abstract,
        aiSummary,
        tags,
      };
      const res = await api.post("/publications", body);
      // success -> redirect to details
      const id = res.data.data?._id || res.data._id || res.data.id;
      navigate(`/publications/${id || ""}`);
    } catch (e) {
      console.error(e);
      setErr(e.response?.data?.message || e.response?.data || e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Add Publication</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-5 rounded shadow"
      >
        <div>
          <label className="text-sm block mb-1">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="text-sm block mb-1">
            Authors (comma separated)
          </label>
          <input
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm block mb-1">Source / Journal</label>
            <input
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="text-sm block mb-1">Link (optional)</label>
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="text-sm block mb-1">Abstract / Content</label>
          <textarea
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
            rows="6"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleGenerateSummary}
            className="px-3 py-2 bg-primary text-white rounded"
            disabled={aiLoading}
          >
            {aiLoading ? "Generating..." : "Generate AI Summary"}
          </button>
          <button
            type="button"
            onClick={handleExtractTags}
            className="px-3 py-2 border rounded"
            disabled={aiLoading}
          >
            {aiLoading ? "Working..." : "Extract Tags"}
          </button>
          <button
            type="button"
            onClick={handleAutofillFromLink}
            className="px-3 py-2 border rounded"
            disabled={aiLoading}
          >
            Auto-fill from Link
          </button>
        </div>

        <div>
          <label className="text-sm block mb-1">AI Summary (editable)</label>
          <textarea
            value={aiSummary}
            onChange={(e) => setAiSummary(e.target.value)}
            rows="4"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="text-sm block mb-1">Tags (comma separated)</label>
          <input
            value={tags.join(", ")}
            onChange={(e) =>
              setTags(e.target.value.split(",").map((s) => s.trim()))
            }
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {err && <div className="text-sm text-red-600">{err}</div>}

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-primary text-white rounded"
          >
            {loading ? "Saving..." : "Create Publication"}
          </button>
          <button
            type="button"
            onClick={() => {
              /* reset */ setTitle("");
              setAuthors("");
              setSource("");
              setLink("");
              setAbstract("");
              setAiSummary("");
              setTags([]);
            }}
            className="text-sm text-slate-500"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
