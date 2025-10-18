import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../api/axiosClient';
import { toast } from '../components/toast'; // simple alert wrapper

export default function Consultant() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [busyId, setBusyId] = useState(null);
  const [feedback, setFeedback] = useState({});

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/consult/queue');
      setItems(data);
      toast('Queue loaded');
    } catch (e) {
      toast('Failed to load queue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const decide = async (id, decision) => {
    setBusyId(id);
    try {
      await api.post('/consult/review', {
        applicationId: id,
        decision,
        feedback: feedback[id] || ''
      });
      setItems(list =>
          list.map(r => r.app_id === id ? { ...r, status: decision } : r)
      );
      toast('Decision saved');
    } catch (e) {
      toast('Decision failed');
    } finally {
      setBusyId(null);
    }
  };

  return (
      <>
        <Navbar />
        <div className="container mt-3">
          <h4>Consultant Dashboard</h4>
          {loading && <div>Loading...</div>}
          {!loading && items.length === 0 && <div>No applications.</div>}
          <ul className="list-group">
            {items.map(app => (
                <li key={app.app_id} className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <div>
                      <strong>{app.program_title}</strong> @ {app.university}<br />
                      <small>Status: {app.status}</small>
                    </div>
                    <div style={{ width: 180 }}>
                  <textarea
                      className="form-control form-control-sm mb-1"
                      rows={1}
                      placeholder="Feedback"
                      disabled={busyId === app.app_id}
                      value={feedback[app.app_id] || ''}
                      onChange={e => setFeedback(f => ({ ...f, [app.app_id]: e.target.value }))}
                  />
                      <div className="btn-group btn-group-sm w-100">
                        <button
                            className="btn btn-success"
                            disabled={busyId === app.app_id}
                            onClick={() => decide(app.app_id, 'ACCEPTED')}
                        >✓</button>
                        <button
                            className="btn btn-warning"
                            disabled={busyId === app.app_id}
                            onClick={() => decide(app.app_id, 'REVIEW')}
                        >Review</button>
                        <button
                            className="btn btn-danger"
                            disabled={busyId === app.app_id}
                            onClick={() => decide(app.app_id, 'REJECTED')}
                        >✕</button>
                      </div>
                    </div>
                  </div>
                </li>
            ))}
          </ul>
        </div>
      </>
  );
}
