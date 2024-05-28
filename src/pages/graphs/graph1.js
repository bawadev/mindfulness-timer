import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const JournalPage = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const savedSessions = JSON.parse(localStorage.getItem('sessions')) || [];
    setSessions(savedSessions);
  }, []);

  useEffect(() => {
    if (sessions.length > 0) {
      const ctx = document.getElementById('emotionsChart').getContext('2d');
      const emotionLabels = ['Happy', 'Relaxed', 'Love', 'Hope', 'Smart'];
      const emotionData = sessions.map((session) => session.emotions);
      const labels = sessions.map((session) => new Date(session.timestamp).toLocaleDateString());

      new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: emotionLabels.map((label, index) => ({
            label,
            data: emotionData.map((data) => data[index]),
            borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
            fill: false,
          })),
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [sessions]);

  const calculateInsights = () => {
    if (sessions.length === 0) return {};
    const emotionsCount = sessions[0].emotions.length;
    const averages = Array(emotionsCount).fill(0);
    sessions.forEach((session) => {
      session.emotions.forEach((value, index) => {
        averages[index] += value;
      });
    });
    averages.forEach((total, index) => {
      averages[index] = total / sessions.length;
    });
    return averages;
  };

  const insights = calculateInsights();

  return (
    <div>
      <h1>Journal and Insights</h1>
      <canvas id="emotionsChart" width="400" height="200"></canvas>
      <div className="insights">
        <h2>Insights</h2>
        <ul>
          {insights.length > 0 &&
            insights.map((insight, index) => (
              <li key={index}>
                {`Average ${['Happy', 'Relaxed', 'Love', 'Hope', 'Smart'][index]}: ${insight.toFixed(2)}`}
              </li>
            ))}
        </ul>
      </div>
      <div className="journal-entries">
        <h2>Journal Entries</h2>
        {sessions.map((session, index) => (
          <div key={index} className="entry">
            <p>Date: {new Date(session.timestamp).toLocaleString()}</p>
            <p>Emotions: {session.emotions.join(', ')}</p>
            <p>Note: {session.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JournalPage;
