import { PageProps } from "$fresh/server.ts";
import { Handler } from "$fresh/server.ts";

export const handler: Handler = async (req, ctx) => {
  const formData = await req.formData();
  const failAlert = Object.fromEntries(formData.entries());
  console.dir(failAlert);
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
