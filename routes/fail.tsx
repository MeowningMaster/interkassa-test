import { PageProps } from "$fresh/server.ts";
import { Handler } from "$fresh/server.ts";

export const handler: Handler = async (req, ctx) => {
  console.log(`fail: ${await req.text()}`);
  return await ctx.render();
};

export default function (props: PageProps) {
  return (
    <>
      <h1>Fail</h1>
      <a href="/">Return to main</a>
    </>
  );
}
