import puppeteer from "puppeteer";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

// Function to get HTML content using Puppeteer
const getHtmlContent = async () => {
  // Launch a new browser instance
  const browser = await puppeteer.launch();
  // Open a new page
  const page = await browser.newPage();
  // Navigate to the specified URL
  await page.goto("https://help.lancrypt.com/docs/cloudAdmin/test/");

  // Evaluate the page's content
  const textContents = await page.evaluate(() => {
    const content = document.getElementById("RH-V-2-1");
    if (!content) return [];

    // Extract text from child elements
    const childElements = content.children;
    const texts = [];
    for (let child of childElements) {
      if (child.textContent) {
        texts.push(child.textContent.replace(/¶/g, "").trim());
      }
    }
    return texts;
  });

  // Close the browser instance
  await browser.close();
  return textContents;
};

// Fetch the text contents from the HTML page
const textContents = await getHtmlContent();

// Component to display the content
export default function Test() {
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
                <AlertDialogDescription>
                  <iframe
                    className="scrollbar-none"
                    src="https://help.lancrypt.com/docs/cloudAdmin/test/#RH-V-2-1"
                    width="400"
                    height="400"
                  ></iframe>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction>Awesome!</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="pt-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Idee 2</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{textContents[0]}</AlertDialogTitle>
                <AlertDialogDescription>
                  {textContents[1]}
                  <br />
                  <br />
                  {textContents[2]}
                  <br />
                  <br />
                  {textContents[3]}
                  <br />
                  <br />
                  {textContents[4]}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction>Awesome!</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
