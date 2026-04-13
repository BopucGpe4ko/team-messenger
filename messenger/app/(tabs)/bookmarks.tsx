// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   Dimensions,
// } from "react-native";
// import { useQuery, useConvexAuth } from "convex/react";
// import { api } from "@/convex/_generated/api";
// import { Image } from "expo-image";
// import { Link } from "expo-router";
// import { COLORS } from "@/constants/theme";
// import { Loader } from "@/components/Loader";

// const NoBookmarksFound = () => (
//   <View
//     style={{
//       flex: 1,
//       justifyContent: "center",
//       alignItems: "center",
//       backgroundColor: COLORS.background,
//     }}
//   >
//     <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: "600" }}>
//       No Bookmarks Found
//     </Text>
//     <Text style={{ color: COLORS.grey, marginTop: 8 }}>
//       Saved posts will appear here
//     </Text>
//   </View>
// );

// export default function BookmarksScreen() {
//   const { isAuthenticated, isLoading: authLoading } = useConvexAuth();

//   const bookmarkedPosts = useQuery(
//     (api.posts as any).getSavedPosts,
//     isAuthenticated ? {} : "skip",
//   );

//   const screenWidth = Dimensions.get("window").width;

//   if (authLoading || bookmarkedPosts === undefined) return <Loader />;

//   if (!bookmarkedPosts || bookmarkedPosts.length === 0) {
//     return <NoBookmarksFound />;
//   }

//   return (
//     <View style={{ flex: 1, backgroundColor: COLORS.background }}>
//       {/*Grid layout*/}
//       <FlatList
//         data={bookmarkedPosts}
//         keyExtractor={(item) => item._id}
//         numColumns={3}
//         renderItem={({ item }) => (
//           <View style={{ width: screenWidth / 3, aspectRatio: 1, padding: 1 }}>
//             <Link href={`/post/${item._id}`} asChild>
//               <TouchableOpacity activeOpacity={0.8}>
//                 <Image
//                   source={item.imageUrl}
//                   style={{ width: "100%", height: "100%" }}
//                   contentFit="cover"
//                 />
//               </TouchableOpacity>
//             </Link>
//           </View>
//         )}
//       />
//     </View>
//   );
// }
