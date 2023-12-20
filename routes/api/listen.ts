import { Handlers } from "https://deno.land/x/fresh@1.6.1/server.ts";
import { CHANNELS } from "../../shared/constants.ts";

export const handler: Handlers = {
  GET() {
    const channel = new BroadcastChannel(CHANNELS.PIXEL_UPDATE);

    const start = (controller: ReadableStreamDefaultController) => {
      controller.enqueue("retry 1000\n\n");

      channel.onmessage = (event) => {
        controller.enqueue(`data: ${JSON.stringify(event.data)}\n\n`);
      };
    };

    const cancel = () => {
      channel.close();
    };

    const body = new ReadableStream({ start, cancel });
    const response = body.pipeThrough(new TextEncoderStream());

    return new Response(response, {
      headers: {
        "content-type": "text/event-stream",
        "cache-control": "no-cache",
      },
    });
  },
};
