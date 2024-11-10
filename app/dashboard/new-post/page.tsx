import { PostForm } from "@/components/power-post-form";

export default function NewPost() {
  return (
    <div className="flex flex-col  items-center gap-3 px-3">
      <div>
        <h1 className="text-4xl font-bold">Create PowerPost</h1>
        <p className="text-gray-500">Create a new power post to be published</p>
      </div>
      <PostForm />
    </div>
  );
}
