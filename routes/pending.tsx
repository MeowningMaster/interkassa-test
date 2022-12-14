import { PageProps } from "$fresh/server.ts";
import { Handler } from "$fresh/server.ts";

export const handler: Handler = async (req, ctx) => {
  console.log(`pending: ${await req.text()}`);
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
