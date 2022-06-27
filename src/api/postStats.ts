import axios from 'axios';

const postStats = async (stats: any, userId: string) => {
  try {
    const res = await axios.post(
      `https://je7nu5ny87.execute-api.us-east-1.amazonaws.com/dev/post-user-stats/${userId}`,
      stats
    );
    console.log("res:", res);
    
  } catch (err) {
    console.error('Err:', err)
  }
};

export default postStats;
