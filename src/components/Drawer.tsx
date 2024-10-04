"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label"

export default function Drawer() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted");
    setIsOpen(false);
  };

  return (
    <div className="relative min-h-screen">
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-50"
      >
        Open Drawer
      </Button>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Submit Form</h2>
            <p className="text-sm text-gray-600">
              Fill out the form and submit your information.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex-1 overflow-y-auto p-4 space-y-4"
          >
            <div className="space-y-2">
              {/* <Label htmlFor="name">Name</Label> */}
              <Input id="name" placeholder="Enter your name" />
            </div>
            <div className="space-y-2">
              {/* <Label htmlFor="email">Email</Label> */}
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="space-y-2">
              {/* <Label htmlFor="message">Message</Label> */}
              <Input id="message" placeholder="Enter your message" />
            </div>
          </form>

          <div className="p-4 border-t">
            <Button
              type="submit"
              onClick={() =>
                handleSubmit({
                  preventDefault: () => {},
                } as React.FormEvent<HTMLFormElement>)
              }
              className="w-full mb-2"
            >
              Submit
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
