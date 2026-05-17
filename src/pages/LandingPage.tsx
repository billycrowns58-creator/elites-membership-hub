import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, ShieldAlert, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface LandingPageProps {
  onJoin: () => void;
  onLogin: () => void;
  onAdmin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onJoin, onLogin, onAdmin }) => {
  const [showAdminCode, setShowAdminCode] = useState(false);
  const [code, setCode] = useState("");

  const handleAdminAccess = () => {
    if (code === "BBG15") {
      onAdmin();
      setShowAdminCode(false);
    } else {
      toast.error("Code d'accès incorrect");
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 relative z-10"
      >
        <div className="w-32 h-32 mx-auto mb-6 rounded-full border-2 border-amber-500 p-1 bg-black">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/44cadc4d-292a-4223-8fea-15db09f17014/logo-elites-2edcc28c-1779054825606.webp" 
            alt="Logo" 
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <h1 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">
          LES <span className="text-amber-500">ÉLITES</span>
        </h1>
        <p className="text-zinc-400 text-sm font-medium tracking-wide">L&apos;excellence dans la solidarité</p>
      </motion.div>

      <div className="w-full max-w-sm space-y-4 relative z-10">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button 
            onClick={onJoin}
            className="w-full h-16 bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg rounded-2xl flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            <UserPlus className="w-6 h-6" />
            REJOINDRE
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button 
            onClick={onLogin}
            variant="outline"
            className="w-full h-16 border-amber-500/50 text-white hover:bg-zinc-900 font-bold text-lg rounded-2xl flex items-center justify-center gap-3"
          >
            <LogIn className="w-6 h-6" />
            CONNEXION
          </Button>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }} 
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button 
            onClick={() => setShowAdminCode(true)}
            variant="ghost"
            className="w-full h-12 text-zinc-500 hover:text-amber-500 font-medium text-sm rounded-xl flex items-center justify-center gap-2"
          >
            <ShieldAlert className="w-4 h-4" />
            ACCÈS ADMIN
          </Button>
        </motion.div>
      </div>

      {showAdminCode && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-zinc-900 border border-amber-500/30 p-8 rounded-3xl w-full max-w-xs relative"
          >
            <button 
              onClick={() => setShowAdminCode(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="text-center mb-6">
              <ShieldAlert className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white uppercase">Portail Sécurisé</h2>
              <p className="text-zinc-500 text-xs mt-1">Saisir le code d&apos;accès administrateur</p>
            </div>
            <Input 
              type="password"
              placeholder="Code (ex: BBG15)"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="bg-black border-zinc-800 text-center text-xl tracking-[0.5em] mb-4 h-12"
            />
            <Button 
              onClick={handleAdminAccess}
              className="w-full bg-amber-500 text-black font-bold"
            >
              VALIDER
            </Button>
          </motion.div>
        </div>
      )}
    </div>
  );
};