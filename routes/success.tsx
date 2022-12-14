import { PageProps } from "$fresh/server.ts";
import { Handler } from "$fresh/server.ts";

export const handler: Handler = async (req, ctx) => {
  // const formData = await req.formData();
  // const successAlert = Object.fromEntries(formData.entries());
  // console.dir(successAlert);
  return await ctx.render();
};

export default function (props: PageProps) {
  return (
    <>
      <h1>Success</h1>
      <a href="/">Return to main</a>
    </>
  );
}