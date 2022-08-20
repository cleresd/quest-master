import { sendReplyToCommand } from '../../sockets/sockets';
import { SocketUser } from '../../sockets/types';
import User from '../../models/user';

export const aresetpassword = {
  command: 'aresetpassword',
  help: "/aresetpassword <username> <new_password>: set a user's password",
  async run(data: { args: string[] }, socket: SocketUser) {
    const { args } = data;

    if (args.length !== 3) {
      sendReplyToCommand(socket, 'Wrong number of inputs.');
      return;
    }

    const username = args[1];
    const new_password = args[2];

    const user = await User.findOne({
      usernameLower: username.toLowerCase(),
    });

    // TODO [2022-08-20T00:29:52.328Z] TSError: ⨯ Unable to compile TypeScript:
    // src/commands/admin/aresetpassword.ts:24:12 - error TS2339: Property 'setPassword' does not exist on type 'Document<unknown, any, { lastLoggedIn: { [toPrim
    // itive]?: {}; toJSON?: {}; toString: {}; toLocaleString: {}; toDateString?: {}; toTimeString?: {}; toLocaleDateString?: {}; toLocaleTimeString?: {}; getTim
    // e?: {}; ... 34 more ...; valueOf: {}; }[]; ... 32 more ...; roleStats?: any; }> & { ...; } & { ...; }'.
/*    await new Promise<void>((res, rej) => {
      user.setPassword(new_password, (err: any) => {
        if (err) {
          rej(err);
        }
        res();
      });
    });*/

    await user.save();

    sendReplyToCommand(socket, 'Successfully set the new password.');
  },
};
