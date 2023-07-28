// import { useContext } from "react";
// import ScrollableFeed from "react-scrollable-feed";
// import { ChatContext } from "../Context/ChatProvider";

// const ScrollableChat = ({ messages }) => {
//     const {loggedInUser} = useContext(ChatContext)
//   return (
//     <ScrollableFeed>
//       {messages &&
//         messages.map((m, i) => (
//           <div style={{ display: "flex" }} key={m._id}>
//             <span
//               style={{
//                 backgroundColor: `${
//                   m.sender._id === loggedInUser._id ? "#7bed9f" : "#70a1ff"
//                 }`,
//                 marginLeft : `${
//                     m.sender._id === loggedInUser._id ? "auto" : "0"
//                   }`,
//                   padding:"5px 15px",
//                   maxWidth : "75%",
//                   borderRadius:"20px" ,
//                   marginTop:"5px"
//               }}
//             >
//               {m.content}
//             </span>
//           </div>
//         ))}
//     </ScrollableFeed>
//   );
// };

// export default ScrollableChat;
