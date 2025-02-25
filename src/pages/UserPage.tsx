import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Story } from "../../types/types";

const UserPage = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<{ username: string } | null>(null);
  const navigate = useNavigate();

  // Use environment variables for the base API URL
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // Fetch user details and stories
  useEffect(() => {
    const fetchUserStories = async () => {
      try {
        // Fetch user details
        const userResponse = await fetch(`${apiUrl}/api/auth/protected`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (!userResponse.ok) {
          const errorData = await userResponse.json();
          throw new Error(errorData.error || "Failed to fetch user details");
        }

        const userData = await userResponse.json();
        setUser(userData);

        // Fetch stories
        const storiesResponse = await fetch(`${apiUrl}/api/stories`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (!storiesResponse.ok) {
          const errorData = await storiesResponse.json();
          throw new Error(errorData.error || "Failed to fetch stories");
        }

        const data = await storiesResponse.json();
        console.log(data); // Log the response to check its structure
        setStories(data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserStories();
  }, [apiUrl]);

  const handleCreateStory = () => {
    navigate("/create-story");
  };

  const handleEditStory = (storyId: number) => {
    navigate(`/edit-story/${storyId}`);
  };

  const handleDeleteStory = async (storyId: number) => {
    try {
      const response = await fetch(`${apiUrl}/api/stories/${storyId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete story");
      }

      setStories(stories.filter((story) => story.id !== storyId)); // Update the local state after deletion
    } catch (error) {
      alert("Error deleting story: " + (error as Error).message);
    }
  };

  const handleAddCollaborator = async (storyId: number) => {
    const userId = prompt("Enter the user ID of the collaborator:"); // Replace with actual user selector
    if (!userId) return;

    try {
      const response = await fetch(`${apiUrl}/api/stories/add-collaborator`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ userId, storyId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add collaborator");
      }

      alert("Collaborator added successfully!");
    } catch (error) {
      alert("Error adding collaborator: " + (error as Error).message);
    }
  };

  return (
    <div className="user-container">
      <h1>Your Dashboard</h1>
      <p>Welcome, {user ? user.username : "loading..."}</p>
      <button onClick={handleCreateStory}>Create New Story</button>
      <h3>All Users' Stories</h3>
      {isLoading ? (
        <p>Loading All Users' stories...</p>
      ) : (
        <ul>
          {stories && Array.isArray(stories) && stories.length > 0 ? (
            stories.map((story) => (
              <div className="storyBox" key={story.id}>
                <h4>{story.title}</h4>
                <p>{story.content}</p>
                <button onClick={() => handleEditStory(story.id)}>Edit</button>
                <button onClick={() => handleDeleteStory(story.id)}>
                  Delete
                </button>
                <button onClick={() => handleAddCollaborator(story.id)}>
                  Add Collaborator
                </button>
              </div>
            ))
          ) : (
            <p>No stories available.</p>
          )}
        </ul>
      )}
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default UserPage;
