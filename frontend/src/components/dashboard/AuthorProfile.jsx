import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button-enhanced";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  User,
  Bookmark,
  Settings,
  Award,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import toast from "react-hot-toast";

const AuthorProfile = () => {
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const [profile, setProfile] = useState({
    username: user?.username || "Guest User",
    email: user?.email || "guest@example.com",
    avatar: user?.avatar || "https://github.com/shadcn.png",
  });

  useEffect(() => {
    if (user) {
      setProfile({
        username: user.username,
        email: user.email,
        avatar: user.avatar || "https://github.com/shadcn.png",
      });
    }
  }, [user]);

  const [settings, setSettings] = useState({
    publicProfile: true,
    autoSave: true,
    showOnlineStatus: true,
  });

  const handleSettingChange = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    toast.success(`${key} updated!`);
  };

  const handleDeleteAccount = () => {
    toast.error("Account deleted (mock)");
    setDeleteConfirmation("");
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl animate-fade-in">
      {/* Title */}
      <h1 className="text-4xl font-bold text-[#0B0F19]  dark:text-[#292a2c] mb-8">
        My Profile
      </h1>

      <Tabs defaultValue="overview">
        {/* Tabs */}
        <TabsList className="mb-8 bg-[#F8FAFC] dark:bg-[#0B0F19] p-2 rounded-xl shadow-md">
          <TabsTrigger
            value="overview"
            className="flex items-center px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#3366FF]/10 data-[state=active]:bg-[#3366FF] data-[state=active]:text-white transition-all"
          >
            <User className="h-4 w-4 mr-2" /> Overview
          </TabsTrigger>
          <TabsTrigger
            value="bookmarks"
            className="flex items-center px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#00CCCC]/10 data-[state=active]:bg-[#00CCCC] data-[state=active]:text-white transition-all"
          >
            <Bookmark className="h-4 w-4 mr-2" /> Bookmarks
          </TabsTrigger>
          <TabsTrigger
            value="achievements"
            className="flex items-center px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#6633CC]/10 data-[state=active]:bg-[#6633CC] data-[state=active]:text-white transition-all"
          >
            <Award className="h-4 w-4 mr-2" /> Achievements
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="flex items-center px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#FFCC00]/10 data-[state=active]:bg-[#FFCC00] data-[state=active]:text-[#0B0F19] transition-all"
          >
            <Settings className="h-4 w-4 mr-2" /> Settings
          </TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview">
          <Card className="shadow-xl border-l-4 border-[#3366FF] bg-[#F8FAFC] dark:bg-[#0B0F19] animate-slide-up">
            <CardContent className="p-8 flex flex-col sm:flex-row gap-8">
              {/* Avatar */}
              <div className="relative inline-block">
                <Avatar className="h-28 w-28 border-4 border-[#00CCCC] shadow-glow animate-scale-in rounded-full">
                  {profile.avatar ? (
                    <img
                      src={profile.avatar}
                      alt={profile.username}
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <AvatarFallback className="bg-[#3366FF] text-white text-3xl font-bold rounded-full">
                      {profile.username[0]}
                    </AvatarFallback>
                  )}
                </Avatar>

                {/* Camera button neatly fixed */}
                <Button
                  size="sm"
                  className="absolute bottom-22 right-1 flex items-center justify-center rounded-full h-8 w-8 bg-[#00CCCC] hover:bg-[#00CCCC]/90 text-white shadow-md"
                >
                  📷
                </Button>
              </div>

              {/* Info */}
              <div className="flex-1 space-y-3">
                <h2 className="text-2xl font-bold text-[#0B0F19] dark:text-white">
                  {profile.username}
                </h2>
                <p className="text-[#64748B]">{profile.email}</p>

                <p className="text-[#64748B] leading-relaxed">
                  Hi! I am a passionate developer exploring{" "}
                  <span className="font-semibold text-[#3366FF]">React</span>{" "}
                  and{" "}
                  <span className="font-semibold text-[#6633CC]">
                    Full-Stack
                  </span>{" "}
                  development 🚀
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {[
                    "HTML/CSS",
                    "Javascript",
                    "React",
                    "Node.js",
                    "MongoDB",
                    "TypeScript",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-[#3366FF]/10 text-[#3366FF] rounded-full text-xs font-medium animate-fade-in"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Socials */}
                <div className="flex gap-4 mt-4">
                  <a
                    href="#"
                    className="p-3 rounded-full bg-[#F8FAFC] dark:bg-[#1E293B] hover:scale-110 transition"
                  >
                    <Github className="h-6 w-6 text-[#0B0F19] dark:text-white" />
                  </a>
                  <a
                    href="#"
                    className="p-3 rounded-full bg-[#F8FAFC] dark:bg-[#1E293B] hover:scale-110 transition"
                  >
                    <Linkedin className="h-6 w-6 text-[#3366FF]" />
                  </a>
                  <a
                    href="#"
                    className="p-3 rounded-full bg-[#F8FAFC] dark:bg-[#1E293B] hover:scale-110 transition"
                  >
                    <Twitter className="h-6 w-6 text-[#00CCCC]" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 📌 Bookmarks */}
        <TabsContent value="bookmarks">
          <Card className="shadow-lg rounded-2xl overflow-hidden animate-fade-in">
            <CardHeader className="bg-gradient-to-r from-[#3366FF] to-[#00CCCC] text-white p-4">
              <CardTitle className="text-lg font-bold">
                Your Bookmarked Posts
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-[#64748B] dark:text-[#E2E8F0] text-center text-sm">
                📌 No bookmarks yet
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 🏆 Achievements */}
        <TabsContent value="achievements">
          <Card className="shadow-lg rounded-2xl overflow-hidden animate-slide-up">
            <CardHeader className="bg-gradient-to-r from-[#6633CC] to-[#3366FF] text-white p-4">
              <CardTitle className="text-lg font-bold">Achievements</CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-center text-[#64748B] dark:text-[#E2E8F0]">
              🏆 No achievements yet — keep going!
            </CardContent>
          </Card>
        </TabsContent>

        {/* ⚙️ Settings */}
        <TabsContent value="settings">
          {/* Account Settings */}
          <Card className="shadow-lg rounded-2xl overflow-hidden animate-fade-in">
            <CardHeader className="bg-gradient-to-r from-[#00CCCC] to-[#3366FF] text-white p-4">
              <CardTitle className="text-lg font-bold">
                Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {/* ✅ Dark mode switch from ThemeContext */}
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-[#0B0F19] dark:text-[#E2E8F0] text-sm sm:text-base">
                  Dark Mode
                </h4>
                <Switch checked={isDark} onCheckedChange={toggleTheme} />
              </div>

              {/* Other local settings */}
              {Object.keys(settings).map((key) => (
                <div className="flex items-center justify-between" key={key}>
                  <h4 className="font-medium text-[#0B0F19] dark:text-[#E2E8F0] capitalize text-sm sm:text-base">
                    {key.replace(/([A-Z])/g, " $1")}
                  </h4>
                  <Switch
                    checked={settings[key]}
                    onCheckedChange={() => handleSettingChange(key)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="shadow-lg rounded-2xl overflow-hidden mt-6 animate-scale-in border border-[#FCA5A5]">
            <CardHeader className="bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white p-4 flex items-center space-x-2">
              <span className="text-xl sm:text-2xl">⚠️</span>
              <CardTitle className="text-lg font-bold">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6 bg-[#FEF2F2] dark:bg-[#7F1D1D]/40 rounded-b-2xl">
              <h4 className="font-bold text-[#B91C1C] dark:text-[#FCA5A5] text-sm sm:text-base">
                Delete Account Permanently
              </h4>
              <p className="text-[#DC2626] dark:text-[#F87171] text-xs sm:text-sm mb-4">
                Once you delete your account, there is no going back. Please be
                certain. All your posts, comments, and data will be permanently
                deleted.
              </p>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="bg-[#EF4444] hover:bg-[#DC2626] text-white text-sm font-medium">
                    Delete My Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-md mx-4 rounded-2xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-[#B91C1C] text-lg font-bold">
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-sm text-[#374151] dark:text-[#E5E7EB]">
                      This action cannot be undone. This will permanently delete
                      your account and remove all your data from our servers.
                      <br />
                      <br />
                      Type <strong>DELETE</strong> in the box below to confirm:
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <Input
                    placeholder="Type DELETE to confirm"
                    value={deleteConfirmation}
                    onChange={(e) => setDeleteConfirmation(e.target.value)}
                    className="mt-4 text-sm border border-[#E2E8F0] rounded-lg"
                  />
                  <AlertDialogFooter className="flex-col sm:flex-row space-y-2 sm:space-y-0">
                    <AlertDialogCancel
                      onClick={() => setDeleteConfirmation("")}
                      className="text-sm"
                    >
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteAccount}
                      disabled={deleteConfirmation !== "DELETE"}
                      className="bg-[#EF4444] hover:bg-[#DC2626] disabled:opacity-50 text-sm"
                    >
                      Delete Account Permanently
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthorProfile;
