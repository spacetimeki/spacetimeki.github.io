import { motion } from "framer-motion";

export default function Terminal() {
  return (
    <motion.div
      className="w-full max-w-2xl bg-zinc-900 border border-green-400 rounded-xl shadow-lg p-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-4">
        <p className="text-green-400">ki@spacetimeki:~$</p>
        <p className="text-green-300"># hi, i'm ki 👋</p>
        <p className="text-green-300">i build real-world hacking labs without hurting anyone :)</p>
      </div>

      <div className="mt-4">
        <p className="text-green-400">[~] current repos:</p>
        <ul className="list-disc list-inside text-green-300">
          <li>
            <a href="https://github.com/spacetimeki/mental-mapping-recon" target="_blank" className="underline">
              mental-mapping-recon
            </a>{" "}
            → reconnaissance framework
          </li>
          <li>
            <a href="https://github.com/spacetimeki/exploitation" target="_blank" className="underline">
              exploitation
            </a>{" "}
            → evilginx2 & post-recon labs
          </li>
        </ul>
      </div>

      <div className="mt-4">
        <p className="text-green-400">[~] connect with me:</p>
        <a
          href="https://www.linkedin.com/in/ki-antic"
          target="_blank"
          className="text-green-300 underline"
        >
          LinkedIn
        </a>
      </div>
    </motion.div>
  );
}
