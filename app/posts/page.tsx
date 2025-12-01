// // pages/posts.tsx
// import { useState, useEffect } from "react";
// import Api from "../_api/api";

// type Post = {
//   id: number;
//   title: string;
//   content: string;
// };

// export default function PostsPage() {
//   const [posts, setPosts] = useState<Post[]>([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       const { data } = await Api.get("/posts", {
//         withCredentials: true,
//       });
//       setPosts(data);
//     };
//     fetchPosts();
//   }, []);

  

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Посты</h1>
//       <div className="grid gap-4">
//         {posts.map((post) => (
//           <div key={post.id} className="bg-white shadow rounded p-4">
//             <h2 className="text-xl font-semibold">{post.title}</h2>
//             <p className="mt-2">{post.content}</p>
//             <button
//               onClick={() => handleFollow(post.id)}
//               className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               Подписаться
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }