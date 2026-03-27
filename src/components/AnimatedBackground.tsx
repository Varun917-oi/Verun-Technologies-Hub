export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      
      {/* Gradient blobs */}
      <div className="absolute w-[600px] h-[600px] bg-purple-500/30 rounded-full blur-3xl animate-blob top-[-100px] left-[-100px]" />
      
      <div className="absolute w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-3xl animate-blob animation-delay-2000 bottom-[-100px] right-[-100px]" />
      
      <div className="absolute w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-3xl animate-blob animation-delay-4000 top-[50%] left-[50%]" />

    </div>
  );
}