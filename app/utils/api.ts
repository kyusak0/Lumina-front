export const getAllChats = async () => {
  // Import and return local data directly
  const { chats } = await import('../friends/data/chats');
  return chats;
};