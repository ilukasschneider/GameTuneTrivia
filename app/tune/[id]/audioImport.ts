import dynamic from "next/dynamic";
export default async function audioImport(audioPath: string) {
  const audio = dynamic(() => import(/* webpackMode: "eager" */ audioPath));
  return audio;
}
