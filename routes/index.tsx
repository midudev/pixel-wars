import { Head } from "$fresh/runtime.ts";
import { Game } from "../islands/Game.tsx";
import { getGrid } from "../shared/db.ts";

export default async function Home() {
  const { tiles } = await getGrid();

  return (
    <>
      <Head>
        <title>pixel-wars</title>
      </Head>

      <Game initialTiles={tiles} />
    </>
  );
}
