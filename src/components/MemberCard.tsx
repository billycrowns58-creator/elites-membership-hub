import React from 'react';
import { User } from '../types';
import { User as UserIcon, Calendar, Hash, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const MemberCard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative w-full aspect-[1.6/1] rounded-2xl overflow-hidden shadow-2xl bg-black border border-amber-500/30"
    >
      <div 
        className="absolute inset-0 opacity-40 mix-blend-overlay"
        style={{ backgroundImage: 'url(https://storage.googleapis.com/dala-prod-public-storage/generated-images/44cadc4d-292a-4223-8fea-15db09f17014/member-card-bg-9301a036-1779054825129.webp)', backgroundSize: 'cover' }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-transparent to-amber-900/20" />

      <div className="relative p-6 h-full flex flex-col justify-between text-white">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-amber-500 bg-black flex items-center justify-center overflow-hidden">
              {user.profilePic ? (
                <img src={user.profilePic} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <UserIcon className="w-6 h-6 text-amber-500" />
              )}
            </div>
            <div>
              <h3 className="font-bold text-lg tracking-tight uppercase">{user.fullName}</h3>
              <p className="text-amber-500 text-xs font-semibold tracking-widest uppercase">{user.role}</p>
            </div>
          </div>
          <div className="text-right">
            <ShieldCheck className="w-8 h-8 text-amber-500 ml-auto" />
            <p className="text-[10px] text-amber-200/60 uppercase mt-1 tracking-widest">LES ÉLITES</p>
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 text-amber-200/80 text-xs mb-1">
              <Hash className="w-3 h-3" />
              <span className="font-mono tracking-widest">{user.referralCode}</span>
            </div>
            <p className="text-xs text-amber-500/60">MEMBRE DEPUIS {new Date(user.createdAt).getFullYear()}</p>
          </div>
          <div className="bg-amber-500 text-black px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-tighter">
            STATUT: {user.isApproved ? 'ACTIF' : 'EN ATTENTE'}
          </div>
        </div>
      </div>
    </motion.div>
  );
};