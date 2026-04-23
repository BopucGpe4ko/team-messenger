// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   FlatList,
//   Pressable,
//   StyleSheet,
// } from "react-native";
// import { Image } from "expo-image";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { useQuery, useMutation } from "convex/react";
// import { Ionicons } from "@expo/vector-icons";
// import { api } from "@/convex/_generated/api";
// import { Id } from "@/convex/_generated/dataModel";
// import { COLORS } from "@/constants/theme";
// import { Loader } from "@/components/Loader";

// export default function UserProfileScreen() {
//   const { id } = useLocalSearchParams();
//   const router = useRouter();

//   const profile = useQuery(api.users.getUserProfile, { id: id as Id<"users"> });
//   const posts = useQuery(api.posts.getPostsByUser, { userId: id as Id<"users"> });
//   const isFollowing = useQuery(api.users.isFollowing, { followingId: id as Id<"users"> });

//   const toggleFollow = useMutation(api.users.toggleFollow);

//   if (profile === undefined || posts === undefined || isFollowing === undefined) {
//     return <Loader />;
//   }
//   if (!profile) {
//     return (
//       <View style={styles.centerContainer}>
//         <Text style={styles.errorText}>User not found</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {/* HEADER */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
//           <Ionicons name="arrow-back" size={24} color={COLORS.white} />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>{profile.username}</Text>
//         <View style={{ width: 40 }} />
//       </View>

//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/*PROFILE INFO (Avatar, Stats, Name, Bio) */}
//         <View style={styles.profileContainer}>
//           <View style={styles.mainInfo}>
//             <Image
//               source={profile.image}
//               style={styles.avatar}
//               contentFit="cover"
//               transition={200}
//             />

//             <View style={styles.statsContainer}>
//               <View style={styles.statItem}>
//                 <Text style={styles.statNumber}>{profile.posts || 0}</Text>
//                 <Text style={styles.statLabel}>Posts</Text>
//               </View>
//               <View style={styles.statItem}>
//                 <Text style={styles.statNumber}>{profile.followers || 0}</Text>
//                 <Text style={styles.statLabel}>Followers</Text>
//               </View>
//               <View style={styles.statItem}>
//                 <Text style={styles.statNumber}>{profile.following || 0}</Text>
//                 <Text style={styles.statLabel}>Following</Text>
//               </View>
//             </View>
//           </View>

//           <Text style={styles.fullname}>{profile.fullname}</Text>
//           {profile.bio && <Text style={styles.bio}>{profile.bio}</Text>}

//           {/* Кнопка Follow/Following */}
//           <Pressable
//             style={[
//               styles.followButton,
//               isFollowing && styles.followingButton
//             ]}
//             onPress={() => toggleFollow({ followingId: id as Id<"users"> })}
//           >
//             <Text style={[
//               styles.followButtonText,
//               isFollowing && styles.followingButtonText
//             ]}>
//               {isFollowing ? "Following" : "Follow"}
//             </Text>
//           </Pressable>
//         </View>

//         {/* Grid постів користувача */}
//         <View style={styles.gridContainer}>
//           {posts.length === 0 ? (
//             <View style={styles.noPostsContainer}>
//               <Ionicons name="camera-outline" size={48} color={COLORS.grey} />
//               <Text style={styles.noPostsText}>No posts yet</Text>
//             </View>
//           ) : (
//             <FlatList
//               data={posts}
//               numColumns={3}
//               scrollEnabled={false}
//               keyExtractor={(item) => item._id}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={styles.gridItem}
//                   onPress={() => router.push(`/post/${item._id}`)} // Перехід на деталі поста
//                 >
//                   <Image
//                     source={item.imageUrl}
//                     style={styles.gridImage}
//                     contentFit="cover"
//                   />
//                 </TouchableOpacity>
//               )}
//             />
//           )}
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background },
//   centerContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: COLORS.background },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 0.5,
//     borderBottomColor: "#333",
//   },
//   backButton: { padding: 4 },
//   headerTitle: { color: COLORS.white, fontSize: 18, fontWeight: "bold" },
//   profileContainer: { padding: 16 },
//   mainInfo: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
//   avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: "#222" },
//   statsContainer: { flex: 1, flexDirection: "row", justifyContent: "space-around", marginLeft: 20 },
//   statItem: { alignItems: "center" },
//   statNumber: { color: COLORS.white, fontSize: 18, fontWeight: "bold" },
//   statLabel: { color: COLORS.grey, fontSize: 12 },
//   fullname: { color: COLORS.white, fontSize: 16, fontWeight: "bold" },
//   bio: { color: COLORS.white, marginTop: 4, fontSize: 14, lineHeight: 20 },
//   followButton: {
//     backgroundColor: COLORS.primary,
//     paddingVertical: 10,
//     borderRadius: 8,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   followingButton: {
//     backgroundColor: "#262626",
//     borderWidth: 1,
//     borderColor: "#333",
//   },
//   followButtonText: { color: COLORS.white, fontWeight: "bold", fontSize: 14 },
//   followingButtonText: { color: COLORS.white },
//   gridContainer: { marginTop: 8 },
//   gridItem: { flex: 1/3, aspectRatio: 1, padding: 1 },
//   gridImage: { width: "100%", height: "100%" },
//   noPostsContainer: { paddingVertical: 60, alignItems: "center" },
//   noPostsText: { color: COLORS.grey, marginTop: 8 },
//   errorText: { color: COLORS.white, fontSize: 16 }
// });
