"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { ExternalLinkIcon, ForkliftIcon, Loader2, LoaderCircleIcon, LocateIcon, RecycleIcon, StarIcon, UsersIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import Link from "next/link";

interface UserProfile {
    login: string;
    avatar_url: string;
    html_url: string;
    bio: string;
    followers: number;
    following: number;
    location: string;
}

interface UserRepo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    forks: number;
}

const GithubProfile = () => {
    const [userName, setUserName] = useState<string>("");
    const [userRepoName, setUserRepoName] = useState<UserRepo[]>([]);
    const [userProfileInfo, setUserProfileInfo] = useState<UserProfile | null>(
        null
    );
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            setIsError(null);
            const profileData = await fetch(
                `https://api.github.com/users/${userName}`
            );
            const userData = profileData.json();

            const repoData = await fetch(
                `https://api.github.com/users/${userName}/repos`
            );
            const repoDataJson = await repoData.json();

            if (!profileData.ok && !repoData.ok) {
                setIsError(profileData.statusText);
                return;
            }

            setUserProfileInfo(await userData);
            setUserRepoName(await repoDataJson);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFetchData = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchData();
    };



    return (
        <div className="w-full h-full bg-[#0A0A0A] flex items-center justify-center flex-col ">
            <div className="p-8 bg-white space-y-8 w-full max-w-2xl rounded-xl shadow-xl mt-6 ">
                <Card className="w-full p-4">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-center">
                            GitHub Profile Viewer
                        </CardTitle>
                        <CardDescription className="text-center font-normal text-sm">
                            Enter your GitHub username to view their profile
                        </CardDescription>
                    </CardHeader>
                    <form
                        onSubmit={handleFetchData}
                        className="flex items-center justify-center gap-3"
                    >
                        <Input
                            placeholder="Enter GitHub username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full"
                        />
                        <Button
                            className="px-4 py-2 bg-black text-white rounded-md"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin w-4 h-4" />
                            ) : (
                                "Search"
                            )}
                        </Button>
                    </form>
                    <CardContent className="mt-4">
                        {isError && <p className="text-red-500">{isError}</p>}
                        {isLoading && <div className="flex items-center justify-center text-center flex-col">
                            <LoaderCircleIcon className="animate-spin text-bold w-12 h-12 " /><span>Loading ..</span>
                        </div>
                        }
                        {userProfileInfo && (
                            <div className="grid gap-8 px-6">
                                <div className="grid md:grid-cols-[120px_1fr] gap-6">
                                    <Avatar className="w-30 h-30 border">
                                        <AvatarImage src={userProfileInfo?.avatar_url} />
                                        <AvatarFallback>
                                            {userProfileInfo?.login.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-2">
                                        <div className="flex items-center gap-2">
                                            <h1 className="text-2xl font-bold">
                                                {userProfileInfo?.login}
                                            </h1>
                                            <Link
                                                href={userProfileInfo?.html_url}
                                                target="_blank"
                                                className="text-black"
                                                prefetch={false}
                                            >
                                                <ExternalLinkIcon className="w-5 h-5" />
                                            </Link>
                                        </div>
                                        <p className="text-gray-600">{userProfileInfo.bio}</p>
                                        <div className="flex items-center gap-4 text-sm">
                                            <div className="flex items-center gap-1">
                                                <UsersIcon className="w-4 h-4" />
                                                <span>{userProfileInfo.followers} Followers</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <UsersIcon className="w-4 h-4" />
                                                <span>{userProfileInfo.following} Following</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <LocateIcon className="w-4 h-4" />
                                                <span>{userProfileInfo.location || "N/A"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
                {userProfileInfo && (


                    <div className="grid gap-6 text-black">
                        <h3 className="text-xl font-bold">Repositories</h3>
                        <div className="grid md:grid-col-2 lg:grid-cols-2 gap-6">
                            {userRepoName.map((repo) => (
                                <Card key={repo.id} className="bg-white shadow-lg  rounded-md border">
                                    <CardHeader>
                                        <div className="flex items-center gap-2">
                                            <RecycleIcon className="w-6 h-6" />
                                            <CardTitle>
                                                <Link
                                                    href={repo.html_url}
                                                    target="_blank"
                                                    className="text-black"
                                                    prefetch={false}
                                                >
                                                    {repo.name}
                                                </Link>
                                            </CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600">
                                            {repo.description || "No description"}
                                        </p>
                                    </CardContent>
                                    <CardFooter className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <StarIcon className="w-4 h-4" />
                                            <span>{repo.stargazers_count}</span>
                                            <ForkliftIcon className="w-4 h-4" />
                                            <span>{repo.forks}</span>
                                        </div>
                                        <Link
                                            href={repo.html_url}
                                            target="_blank"
                                            className="text-black hover:underline"
                                            prefetch={false}
                                        >
                                            View on GitHub
                                        </Link>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GithubProfile;
