import { PageProps } from "$fresh/server.ts";
import { consts } from "../utils/consts.ts";

export default function (props: PageProps) {
  const { rt } = props.params;

  return (
    <>
      <p>${rt}</p>
      <a href={consts.THIS_HOST}>Return to main</a>
    </>
  );
}
