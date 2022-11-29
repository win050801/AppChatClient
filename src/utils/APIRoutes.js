export const host = "http://localhost:5000";
export const loginRoute = `${host}/api/auth/login`;
export const KtraRoute = `${host}/api/auth/ktraSDT`;
export const registerRoute = `${host}/api/auth/register`;
export const logoutRoute = `${host}/api/auth/logout`;
export const allUsersRoute = `${host}/api/auth/allusers`;
//Send Messsage
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const recieveMessageRoute = `${host}/api/messages/getmsg`;
export const addreaction = `${host}/api/messages/addreaction`;
export const setAvatarRoute = `${host}/api/auth/setavatar`;
export const addRoom = `${host}/api/room/addRoom`;
export const getRoom = `${host}/api/room/getRoom`;
//Get Message Room Chat
export const getMessagesRoom = `${host}/api/messages/getMessagesRoom`;
export const addTT = `${host}/api/room/addTT`;
export const renameRoom = `${host}/api/room/renameRoom`;

export const updateManager = `${host}/api/room/updateManager`;
export const blockChat = `${host}/api/room/blockChat`;

//Image Send
export const imageMessageSend = `${host}/api/messages/image-message-send`;
//File Send
export const fileMessageSend = `${host}/api/messages/file-message-send`;
//Delete Message FromSelf
export const deleteMessageFromSelf = `${host}/api/messages/delete-message-fromSelf`;
//Delete Message ToAll
export const deleteMessageToAll = `${host}/api/messages/delete-message-toAll`;

//Get User By PhoneNumber
export const getUserByPhoneNumber = `${host}/api/friend/getUserByPhoneNumber`;
//Add Friend
export const addFriend = `${host}/api/friend/addFriend`;
//Get Current Friend
export const getCurrentFriend = `${host}/api/friend/getCurrentFriend`;
//getIdOfListFriendByPhoneNumber
export const getIdOfListFriendByPhoneNumber = `${host}/api/friend/getIdOfListFriendByPhoneNumber`;
//Get All Current Friend
export const getAllCurrentFriend = `${host}/api/friend/getAllCurrentFriend`;
//Request Friend
export const requestFriend = `${host}/api/requestFriend/requestFriend`;
//Get All Request Friend By Id
export const getAllFriendRequstById = `${host}/api/requestFriend/getAllFriendRequstById`;
//Agree Request Friend
export const agreeRequestFriend = `${host}/api/requestFriend/agreeRequestFriend`;
// Reject Request Friend
export const rejectRequestFriend = `${host}/api/requestFriend/rejectRequestFriend`;
