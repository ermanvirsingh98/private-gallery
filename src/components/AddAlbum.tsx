"use client";
import { useFoldersContext } from "@/app/context/FoldersContext";
import { SearchResult } from "@/app/gallery/page";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FolderPlus } from "lucide-react";
import { useState } from "react";
// import { addAlbum } from "./actions";

export function AddAlbum({ edit = false, value }: any) {
  const [albumName, setAlbumName] = useState(value || "");
  const [open, setOpen] = useState(false);

  const { folders, setFolders } = useFoldersContext();

  const handleClick = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/cloudnary/folders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ albumName }),
    });

    const results = await res.json();

    // callback(results);
    setFolders([...folders, { ...results.data }] as any);

    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpenState) => {
        setOpen(newOpenState);
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <FolderPlus className="mr-2 h-4 w-4" />
          Add to Album
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new album</DialogTitle>
          <DialogDescription>
            Type an album name you want to create
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Album
            </Label>
            <Input
              onChange={(e) => setAlbumName(e.currentTarget.value)}
              id="album-name"
              value={albumName}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleClick} type="submit">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
