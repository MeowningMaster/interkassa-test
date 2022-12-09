import { PageProps } from "$fresh/server.ts";

export default function (props: PageProps) {
  const { result } = props.params;

  return (
    <>
      <p>{result}</p>
      <a href="/">Return to main</a>
    </>
  );
}
