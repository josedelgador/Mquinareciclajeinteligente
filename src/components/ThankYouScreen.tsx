import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Leaf } from 'lucide-react';

interface ThankYouScreenProps {
  onFinish: () => void;
}

export function ThankYouScreen({ onFinish }: ThankYouScreenProps) {
  useEffect(() => {
    // Auto-return to welcome screen after 5 seconds
    const timer = setTimeout(() => {
      onFinish();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0,
              scale: 0,
              x: Math.random() * 400 - 200,
              y: 600
            }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0.5],
              y: -100
            }}
            transition={{
              duration: 3,
              delay: i * 0.3,
              repeat: Infinity,
              repeatDelay: 1
            }}
            className="absolute left-1/2"
          >
            <Sparkles className="w-8 h-8 text-green-500" />
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center relative z-10"
      >
        {/* Heart Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 200,
            delay: 0.3 
          }}
          className="mb-8 relative inline-block"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute inset-0 bg-green-500 rounded-full blur-3xl opacity-40"
          />
          <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 p-8 rounded-full">
            <Heart className="w-24 h-24 text-white fill-white" />
          </div>
        </motion.div>

        {/* Thank you message */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-white mb-4"
        >
          ¡Gracias!
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-slate-300 text-xl mb-8 max-w-md"
        >
          Tu contribución hace la diferencia para un planeta más limpio
        </motion.p>

        {/* Environmental badges */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex gap-6 justify-center mb-8"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="bg-green-500/20 p-4 rounded-full">
              <Leaf className="w-8 h-8 text-green-500" />
            </div>
            <span className="text-slate-400 text-sm">Eco-friendly</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <div className="bg-blue-500/20 p-4 rounded-full">
              <Sparkles className="w-8 h-8 text-blue-500" />
            </div>
            <span className="text-slate-400 text-sm">Recompensado</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <div className="bg-purple-500/20 p-4 rounded-full">
              <Heart className="w-8 h-8 text-purple-500" />
            </div>
            <span className="text-slate-400 text-sm">Sostenible</span>
          </div>
        </motion.div>

        {/* Auto-return message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-slate-500 text-sm"
        >
          Regresando al inicio...
        </motion.p>

        {/* Progress bar */}
        <motion.div
          className="w-64 h-1 bg-slate-800 rounded-full overflow-hidden mx-auto mt-4"
        >
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear" }}
            className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
          />
        </motion.div>
      </motion.div>

      {/* Skip button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={onFinish}
        className="absolute bottom-8 text-slate-400 hover:text-white transition-colors"
      >
        Toca para volver al inicio
      </motion.button>
    </motion.div>
  );
}
