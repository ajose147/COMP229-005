// Projects page - this displays my featured projects in a grid layout
import React, { useEffect, useState } from 'react';
import auth from './auth.js';

export default function Projects(){
    const [projects, setProjects] = useState([]);
    const [form, setForm] = useState({ title: '', firstname: '', lastname: '', email: '', completion: '', description: ''});
    const [error, setError] = useState('');

    const load = () => {
        fetch('/api/projects')
          .then(res => res.json())
          .then(data => setProjects(data))
          .catch(err => console.error(err));
    };

    useEffect(()=>{ load(); }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleCreate = async (e) => {
        e.preventDefault();
        setError('');
        try{
            const token = auth.getToken();
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify(form)
            });
            if (!res.ok) {
                const err = await res.json();
                setError(err.error || 'Create failed');
                return;
            }
            setForm({ title: '', firstname: '', lastname: '', email: '', completion: '', description: ''});
            load();
        }catch(err){ setError('Network error'); }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this project?')) return;
        try{
            const token = auth.getToken();
            const res = await fetch(`/api/projects/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
            if (res.ok) load();
        }catch(e){ console.error(e); }
    };

    const me = auth.isAuthenticated();
    const role = me && me.user ? me.user.role : null;

    return (
        <section className="section">
            <div className="section-container">
                <h2 className="about-title">Featured Projects</h2>
                {role === 'admin' && (
                    <div style={{ marginBottom: 20 }}>
                        <h3>Create Project</h3>
                        <form onSubmit={handleCreate}>
                            <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
                            <input name="firstname" placeholder="First name" value={form.firstname} onChange={handleChange} required />
                            <input name="lastname" placeholder="Last name" value={form.lastname} onChange={handleChange} required />
                            <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                            <input name="completion" placeholder="Completion date (YYYY-MM-DD)" value={form.completion} onChange={handleChange} />
                            <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
                            <button type="submit">Create</button>
                        </form>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </div>
                )}

                <div className="projects-grid">
                    {projects.map(p => (
                        <div key={p._id} className="project-card">
                            <h3 className="project-title">{p.title}</h3>
                            <p className="project-description">{p.description}</p>
                            <div className="project-meta">By {p.firstname} {p.lastname} — {p.email} — {p.completion ? new Date(p.completion).toLocaleDateString() : ''}</div>
                            {role === 'admin' && <button onClick={()=>handleDelete(p._id)}>Delete</button>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}