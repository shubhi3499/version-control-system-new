import React, { useState, useEffect } from 'react';
import "./dashboard.css";

const Dashboard = () => {
    const [repositories, setRepositories] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestedRepositories, setSuggestedRepositories] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        // Fetch repos for current user
        const fetchRepositories = async () => {
            try {
                const response = await fetch(`http://localhost:3002/repo/user/${userId}`);
                console.log("User repos status:", response.status);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setRepositories(data.repositories || []);
                console.log("User repos data:", data);
            } catch (err) {
                console.error("Error while fetching user repositories:", err);
            }
        };

        // Fetch all suggested repositories
        const fetchSuggestedRepositories = async () => {
            try {
                const response = await fetch(`http://localhost:3002/repo/all`);
                console.log("All repos status:", response.status);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setSuggestedRepositories(data || []);
                console.log("Suggested repos data:", data);
            } catch (err) {
                console.error("Error while fetching suggested repositories:", err);
            }
        };

        fetchRepositories();
        fetchSuggestedRepositories();
    }, []);

    useEffect(() => {
        if (searchQuery === '') {
            setSearchResults(repositories);
        } else {
            const filteredRepo = repositories.filter(repo =>
                repo.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchResults(filteredRepo);
        }
    }, [searchQuery, repositories]);

    return (
        <section id='dashboard'>
            <aside>
                <h3>Suggested Repositories</h3>
                {suggestedRepositories.map((repo) => (
                    <div key={repo._id}>
                        <h4>{repo.name}</h4>
                        <p>{repo.description}</p>
                    </div>
                ))}
            </aside>

            <main>
            <h2>Your Repositories</h2>
                {repositories.map((repo) => {
                    return(
                    <div key={repo._id}>
                        <h4>{repo.name}</h4>
                        <p>{repo.description}</p>
                    </div>
                    );
                })}
            </main>

            <aside>
                <h3>Upcoming Events</h3>
                <ul>
                    <li><p>Tech Conference - Dec 15</p></li>
                    <li><p>Developer Meetup - Dec 21</p></li>
                    <li><p>React Summit - Jan 1</p></li>
                </ul>
            </aside>
        </section>
    );
};

export default Dashboard;
