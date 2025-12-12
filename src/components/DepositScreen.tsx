import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Package, Scale, Coins, CheckCircle, Loader } from 'lucide-react';
import { SessionData } from '../App';

interface DepositScreenProps {
  sessionData: SessionData;
  onUpdateSession: (data: SessionData) => void;
  onFinish: () => void;
}

export function DepositScreen({ sessionData, onUpdateSession, onFinish }: DepositScreenProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [recentDeposit, setRecentDeposit] = useState(false);

  // Simulate random deposits
  const simulateDeposit = () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    setRecentDeposit(true);
    
    setTimeout(() => {
      const newContainers = sessionData.containers + 1;
      const additionalKilos = Number((Math.random() * 0.05 + 0.02).toFixed(3)); // 0.02-0.07 kg
      const newKilos = Number((sessionData.kilos + additionalKilos).toFixed(3));
      const additionalPoints = Math.floor(Math.random() * 5 + 3); // 3-7 points
      const newPoints = sessionData.points + additionalPoints;

      onUpdateSession({
        ...sessionData,
        containers: newContainers,
        kilos: newKilos,
        points: newPoints
      });

      setIsProcessing(false);
      
      setTimeout(() => {
        setRecentDeposit(false);
      }, 500);
    }, 1500);
  };

  // Auto-simulate deposits for demo
  useEffect(() => {
    if (sessionData.containers === 0) {
      const timer = setTimeout(simulateDeposit, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col"
    >
      {/* Header */}
      <div className="bg-slate-900/50 p-6 border-b border-slate-700">
        <h2 className="text-white text-center mb-2">
          Depósito de Envases
        </h2>
        <p className="text-slate-400 text-center">
          Introduce tus envases en la máquina
        </p>
      </div>

      {/* Real-time Stats */}
      <div className="p-6 space-y-4">
        <motion.div
          animate={recentDeposit ? { scale: [1, 1.05, 1] } : {}}
          className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-2 border-blue-500/50 p-6 rounded-2xl"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-blue-500 p-4 rounded-xl">
                <Package className="w-10 h-10 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-1">Envases depositados</p>
                <p className="text-white text-4xl">
                  {sessionData.containers}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={recentDeposit ? { scale: [1, 1.05, 1] } : {}}
          className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-2 border-purple-500/50 p-6 rounded-2xl"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-purple-500 p-4 rounded-xl">
                <Scale className="w-10 h-10 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-1">Kilogramos</p>
                <p className="text-white text-4xl">
                  {sessionData.kilos.toFixed(3)}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={recentDeposit ? { scale: [1, 1.05, 1] } : {}}
          className="bg-gradient-to-br from-green-500/20 to-emerald-600/10 border-2 border-green-500/50 p-6 rounded-2xl"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-xl">
                <Coins className="w-10 h-10 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-1">Puntos ganados</p>
                <p className="text-white text-4xl">
                  {sessionData.points}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Status Area */}
      <div className="flex-1 flex items-center justify-center px-6">
        <AnimatePresence mode="wait">
          {isProcessing ? (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-4"
              >
                <Loader className="w-16 h-16 text-green-500" />
              </motion.div>
              <p className="text-white text-xl mb-2">Procesando envase...</p>
              <p className="text-slate-400">Identificando material</p>
            </motion.div>
          ) : (
            <motion.div
              key="ready"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center"
            >
              <div className="bg-green-500/20 p-8 rounded-full inline-block mb-4">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              <p className="text-white text-xl mb-2">Listo para recibir</p>
              <p className="text-slate-400">Introduce tus envases</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      <div className="p-6 space-y-3">
        <button
          onClick={simulateDeposit}
          disabled={isProcessing}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-slate-700 disabled:to-slate-700 text-white py-5 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <span className="text-xl">Simular depósito</span>
        </button>
        
        <button
          onClick={onFinish}
          disabled={sessionData.containers === 0}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-slate-800 disabled:to-slate-800 text-white py-5 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-green-500/50 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        >
          <span className="text-xl">Finalizar depósito</span>
        </button>
      </div>
    </motion.div>
  );
}
