import { PageProps } from "$fresh/server.ts";

export default function (props: PageProps) {
  const { rt } = props.params;

  return (
    <>
      <p>{rt}</p>
      <a href="/">Return to main</a>
    </>
  );
}
