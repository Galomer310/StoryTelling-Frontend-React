export const fetchStories = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/stories");
      if (!response.ok) {
        throw new Error("Failed to fetch stories");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching stories:", error);
      return [];
    }
  };
  