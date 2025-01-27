// UserPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Story } from "../../types/types"; // Import the Story interface

const UserPage = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Fetch the stories created by the user
  useEffect(() => {
    const fetchUserStories = async () => {
      try {
        const response = await fetch(
          "https://storytellingapp-backend-react.onrender.com/api/stories",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch stories");
        }

        const data = await response.json();
        setStories(data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserStories();
  }, []);

  const handleCreateStory = () => {
    navigate("/create-story");
  };

  const handleEditStory = (storyId: number) => {
    navigate(`/edit-story/${storyId}`);
  };

  const handleDeleteStory = async (storyId: number) => {
    try {
      const response = await fetch(
        `https://storytellingapp-backend-react.onrender.com/api/stories/${storyId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete story");
      }

      setStories(stories.filter((story) => story.id !== storyId)); // Update the local state after deletion
    } catch (error) {
      alert("Error deleting story: " + (error as Error).message);
    }
  };

  return (
    <div className="user-container">
      <h1>Your Dashboard</h1>
      <p>Manage your stories and explore others' creativity.</p>
      <button onClick={handleCreateStory}>Create New Story</button>
      <h3>Your Stories</h3>
      {isLoading ? (
        <p>Loading your stories...</p>
      ) : (
        <ul>
          {stories.map((story) => (
            <li key={story.id}>
              <h4>{story.title}</h4>
              <p>{story.content}</p>
              <button onClick={() => handleEditStory(story.id)}>Edit</button>
              <button onClick={() => handleDeleteStory(story.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default UserPage;
