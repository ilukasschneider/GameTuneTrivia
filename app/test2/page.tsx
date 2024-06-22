"use client";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch the JSON data when the component mounts
    fetch("https://help.lancrypt.com/json/cloudAdmin/latest-en.json")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []); // Empty dependency array means this useEffect runs once when the component mounts

  return (
    <div className="mt-40">
      <div className="place-content-center grid gap-3 mt-40">
        <div className="pt-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Idee 1</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Alert</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogDescription>
                {data
                  ? JSON.stringify(data, null, 2)
                  : "Content from help.lancrypt is not here yet..."}
              </AlertDialogDescription>
              <AlertDialogAction>Close</AlertDialogAction>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default Page;
