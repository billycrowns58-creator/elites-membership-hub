import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStorage } from './hooks/useStorage';
import { LandingPage } from './pages/LandingPage';
import { User, Role, Contribution } from './types';
import { 
  User as UserIcon, 
  Phone, 
  MapPin, 
  Calendar, 
  Venus, 
  Mars, 
  ArrowLeft, 
  CreditCard, 
  History, 
  Bell, 
  LogOut,
  ChevronRight,
  Plus,
  TrendingUp,
  Award,
  Users,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  BarChart3,
  Download,
  ShieldCheck,
  Smartphone,
  Copy,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { MemberCard } from './components/MemberCard';
import { toast } from 'sonner';

// --- AUTH COMPONENT ---
const Auth: React.FC<{ 
  mode: 'login' | 'signup', 
  onBack: () => void, 
  onSuccess: (user: User) => void,
  users: User[],
  addUser: (u: User) => void
}> = ({ mode, onBack, onSuccess, users, addUser }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    password: '',
    address: '',
    gender: 'M',
    birthDate: '',
    role: 'Membre' as Role
  });

  const handleLogin = () => {
    const user = users.find(u => u.phone === formData.phone && u.password === formData.password);
    if (user) {
      if (user.isBlocked) return toast.error("Compte bloqué par l&apos;administration");
      onSuccess(user);
    } else {
      toast.error("Identifiants incorrects");
    }
  };

  const handleSignup = () => {
    if (users.find(u => u.phone === formData.phone)) return toast.error("Téléphone déjà utilisé");
    
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      fullName: formData.fullName,
      phone: formData.phone,
      password: formData.password,
      address: formData.address,
      gender: formData.gender,
      birthDate: formData.birthDate,
      role: formData.role,
      referralCode: "EL" + Math.random().toString(36).substr(2, 5).toUpperCase(),
      inviteCount: 0,
      isApproved: false,
      isBlocked: false,
      createdAt: new Date().toISOString()
    };
    
    addUser(newUser);
    toast.success("Compte créé avec succès !");
    onSuccess(newUser);
  };

  return (
    <div className="min-h-screen bg-black p-6 flex flex-col">
      <button onClick={onBack} className="text-zinc-500 flex items-center gap-2 mb-8">
        <ArrowLeft className="w-5 h-5" /> Retour
      </button>

      <div className="flex-1">
        <h2 className="text-3xl font-bold text-white mb-2 uppercase">
          {mode === 'login' ? 'Connexion' : 'Inscription'}
        </h2>
        <p className="text-zinc-500 text-sm mb-8">
          {mode === 'login' ? "Heureux de vous revoir parmi les élites" : "Rejoignez le cercle restreint de l&apos;excellence"}
        </p>

        <div className="space-y-4">
          {mode === 'login' ? (
            <>
              <Input 
                placeholder="Téléphone" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="bg-zinc-900 border-zinc-800 h-14 text-white" 
              />
              <Input 
                type="password" 
                placeholder="Mot de passe" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="bg-zinc-900 border-zinc-800 h-14 text-white" 
              />
              <Button onClick={handleLogin} className="w-full h-14 bg-amber-500 text-black font-bold uppercase">Accéder</Button>
              <button className="text-amber-500 text-xs w-full text-center mt-4">Mot de passe oublié ?</button>
            </>
          ) : (
            <div className="space-y-4">
              {step === 1 ? (
                <>
                  <Input placeholder="Nom complet" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="bg-zinc-900 border-zinc-800 h-14 text-white" />
                  <Input placeholder="Téléphone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="bg-zinc-900 border-zinc-800 h-14 text-white" />
                  <Input type="password" placeholder="Mot de passe" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="bg-zinc-900 border-zinc-800 h-14 text-white" />
                  <Button onClick={() => setStep(2)} className="w-full h-14 bg-amber-500 text-black font-bold uppercase">Suivant</Button>
                </>
              ) : (
                <>
                  <Input placeholder="Adresse" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="bg-zinc-900 border-zinc-800 h-14 text-white" />
                  <div className="flex gap-4">
                    <button onClick={() => setFormData({...formData, gender: 'M'})} className={`flex-1 h-12 rounded-xl border flex items-center justify-center gap-2 ${formData.gender === 'M' ? 'bg-amber-500 border-amber-500 text-black' : 'border-zinc-800 text-zinc-500'}`}>
                      <Mars className="w-4 h-4" /> Homme
                    </button>
                    <button onClick={() => setFormData({...formData, gender: 'F'})} className={`flex-1 h-12 rounded-xl border flex items-center justify-center gap-2 ${formData.gender === 'F' ? 'bg-amber-500 border-amber-500 text-black' : 'border-zinc-800 text-zinc-500'}`}>
                      <Venus className="w-4 h-4" /> Femme
                    </button>
                  </div>
                  <Input type="date" value={formData.birthDate} onChange={e => setFormData({...formData, birthDate: e.target.value})} className="bg-zinc-900 border-zinc-800 h-14 text-white" />
                  
                  <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
                    <p className="text-zinc-500 text-xs mb-3">CHOISIR UN RÔLE</p>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Membre', 'Agent', 'Administrateur'] as Role[]).map(r => (
                        <button 
                          key={r}
                          onClick={() => setFormData({...formData, role: r})}
                          className={`text-[10px] h-10 rounded-lg border font-bold ${formData.role === r ? 'bg-amber-500 border-amber-500 text-black' : 'border-zinc-800 text-zinc-500'}`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button onClick={handleSignup} className="w-full h-14 bg-amber-500 text-black font-bold uppercase">Finaliser</Button>
                  <button onClick={() => setStep(1)} className="text-zinc-500 text-xs w-full text-center">Étape précédente</button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- MEMBER DASHBOARD ---
const MemberSpace: React.FC<{ 
  user: User, 
  onLogout: () => void,
  contributions: Contribution[],
  onPay: () => void
}> = ({ user, onLogout, contributions, onPay }) => {
  const userContribs = contributions.filter(c => c.userId === user.id);
  const totalUSD = userContribs.filter(c => c.currency === 'USD' && c.status === 'Approuvé').reduce((acc, c) => acc + c.amount, 0);
  const totalCDF = userContribs.filter(c => c.currency === 'CDF' && c.status === 'Approuvé').reduce((acc, c) => acc + c.amount, 0);

  return (
    <div className="min-h-screen bg-[#050505] text-white pb-24">
      <div className="p-6 bg-black border-b border-zinc-900 flex justify-between items-center sticky top-0 z-30">
        <div>
          <h1 className="text-lg font-bold">Bonjour, {user.fullName.split(' ')[0]}</h1>
          <p className="text-zinc-500 text-xs">{user.isApproved ? 'Compte vérifié' : 'Vérification en cours'}</p>
        </div>
        <button onClick={onLogout} className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400">
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 space-y-6">
        <MemberCard user={user} />

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800">
            <p className="text-zinc-500 text-[10px] uppercase font-bold mb-1">Total Cotisé (USD)</p>
            <p className="text-xl font-black text-amber-500">${totalUSD}</p>
          </div>
          <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800">
            <p className="text-zinc-500 text-[10px] uppercase font-bold mb-1">Total Cotisé (CDF)</p>
            <p className="text-xl font-black text-amber-500">{totalCDF} FC</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 rounded-3xl text-black shadow-lg shadow-amber-500/10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[10px] font-black uppercase opacity-60">Parrainage</p>
              <p className="text-2xl font-black">{user.inviteCount} <span className="text-sm font-bold">INVITÉS</span></p>
            </div>
            <Award className="w-10 h-10 opacity-40" />
          </div>
          <div className="bg-black/10 rounded-xl p-3 flex justify-between items-center backdrop-blur-sm border border-black/5">
            <span className="text-xs font-mono font-bold">{user.referralCode}</span>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(user.referralCode);
                toast.success("Code copié !");
              }}
              className="flex items-center gap-1 text-[10px] font-black uppercase"
            >
              <Copy className="w-3 h-3" /> Copier
            </button>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold uppercase text-xs tracking-widest text-zinc-500">Activités récentes</h2>
            <button className="text-amber-500 text-[10px] font-bold uppercase">Tout voir</button>
          </div>
          <div className="space-y-3">
            {userContribs.length > 0 ? (
              userContribs.slice(0, 3).map(c => (
                <div key={c.id} className="bg-zinc-900/30 p-4 rounded-2xl border border-zinc-800/50 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Cotisation {c.method}</p>
                      <p className="text-[10px] text-zinc-500">{new Date(c.date).toLocaleDateString('fr-FR')}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${c.currency === 'USD' ? 'text-amber-500' : 'text-zinc-300'}`}>
                      {c.currency === 'USD' ? '$' : ''}{c.amount} {c.currency === 'CDF' ? 'FC' : ''}
                    </p>
                    <p className={`text-[10px] font-bold ${c.status === 'Approuvé' ? 'text-green-500' : c.status === 'Refusé' ? 'text-red-500' : 'text-amber-500'}`}>
                      {c.status}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 bg-zinc-900/20 rounded-3xl border border-dashed border-zinc-800">
                <History className="w-12 h-12 text-zinc-800 mx-auto mb-2" />
                <p className="text-zinc-600 text-xs">Aucune transaction pour le moment</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black to-transparent">
        <Button 
          onClick={onPay}
          className="w-full h-16 bg-amber-500 hover:bg-amber-600 text-black font-black text-lg rounded-2xl shadow-2xl shadow-amber-500/20 flex items-center justify-center gap-3 uppercase"
        >
          <Plus className="w-6 h-6 stroke-[3px]" />
          Faire une cotisation
        </Button>
      </div>
    </div>
  );
};

// --- ADMIN DASHBOARD ---
const AdminSpace: React.FC<{
  users: User[],
  setUsers: (u: User[]) => void,
  contributions: Contribution[],
  setContributions: (c: Contribution[]) => void,
  onLogout: () => void
}> = ({ users, setUsers, contributions, setContributions, onLogout }) => {
  const [tab, setTab] = useState<'stats' | 'members' | 'payments'>('stats');
  const [search, setSearch] = useState("");

  const totalCollectedUSD = contributions.filter(c => c.status === 'Approuvé' && c.currency === 'USD').reduce((acc, c) => acc + c.amount, 0);
  const totalCollectedCDF = contributions.filter(c => c.status === 'Approuvé' && c.currency === 'CDF').reduce((acc, c) => acc + c.amount, 0);

  const pendingUsers = users.filter(u => !u.isApproved);

  const filteredUsers = users.filter(u => u.fullName.toLowerCase().includes(search.toLowerCase()) || u.phone.includes(search));

  const handleApproveUser = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, isApproved: true } : u));
    toast.success("Membre approuvé");
  };

  const handleApprovePayment = (id: string) => {
    setContributions(contributions.map(c => c.id === id ? { ...c, status: 'Approuvé' } : c));
    toast.success("Paiement validé");
  };

  const handleRefutePayment = (id: string) => {
    setContributions(contributions.map(c => c.id === id ? { ...c, status: 'Refusé' } : c));
    toast.error("Paiement refusé");
  };

  const handleBlockUser = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, isBlocked: !u.isBlocked } : u));
    toast.info("Statut membre mis à jour");
  };

  return (
    <div className="min-h-screen bg-black text-white pb-10">
      <div className="p-6 border-b border-zinc-900 bg-black sticky top-0 z-30 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-black text-amber-500 tracking-tighter uppercase">ADMIN <span className="text-white">PANEL</span></h1>
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Gestion Centrale</p>
        </div>
        <button onClick={onLogout} className="bg-zinc-900 p-2 rounded-lg text-zinc-400">
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      <div className="flex p-4 gap-2 bg-zinc-950 overflow-x-auto no-scrollbar">
        {(['stats', 'members', 'payments'] as const).map((t) => (
          <button 
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase whitespace-nowrap border ${tab === t ? 'bg-amber-500 border-amber-500 text-black' : 'border-zinc-800 text-zinc-500'}`}
          >
            {t === 'stats' ? 'Statistiques' : t === 'members' ? 'Membres' : 'Paiements'}
          </button>
        ))}
      </div>

      <div className="p-6">
        {tab === 'stats' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase">Collecte Totale</p>
                  <BarChart3 className="w-5 h-5 text-amber-500" />
                </div>
                <p className="text-3xl font-black text-amber-500">${totalCollectedUSD}</p>
                <p className="text-sm font-bold text-zinc-400">{totalCollectedCDF} FC</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800 text-center">
                  <Users className="w-6 h-6 text-zinc-500 mx-auto mb-2" />
                  <p className="text-2xl font-black">{users.length}</p>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase">Membres</p>
                </div>
                <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800 text-center text-amber-500">
                  <ShieldCheck className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-2xl font-black">{pendingUsers.length}</p>
                  <p className="text-[10px] font-bold uppercase">En Attente</p>
                </div>
              </div>
            </div>

            <Button className="w-full bg-zinc-900 text-white border border-zinc-800 h-14 rounded-2xl flex items-center justify-center gap-2 uppercase">
              <Download className="w-5 h-5" /> Exporter la liste (PDF/Excel)
            </Button>
          </div>
        )}

        {tab === 'members' && (
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <Input 
                placeholder="Rechercher un membre..." 
                className="bg-zinc-900 border-zinc-800 pl-12 h-12"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <div className="space-y-3">
              {filteredUsers.map(u => (
                <div key={u.id} className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-amber-500" />
                      </div>
                      <div>
                        <p className="text-sm font-bold uppercase">{u.fullName}</p>
                        <p className="text-xs text-zinc-500">{u.phone}</p>
                      </div>
                    </div>
                    <div className={`text-[10px] font-black uppercase px-2 py-1 rounded ${u.isApproved ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}`}>
                      {u.isApproved ? 'Actif' : 'Attente'}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {!u.isApproved && (
                      <Button onClick={() => handleApproveUser(u.id)} className="h-10 bg-green-600 text-[10px] font-bold uppercase">Approuver</Button>
                    )}
                    <Button 
                      onClick={() => handleBlockUser(u.id)} 
                      variant="outline" 
                      className={`h-10 text-[10px] font-bold uppercase ${u.isBlocked ? 'border-red-500 text-red-500' : 'border-zinc-700 text-zinc-400'}`}
                    >
                      {u.isBlocked ? 'Débloquer' : 'Bloquer'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'payments' && (
          <div className="space-y-4">
            {contributions.length > 0 ? (
              contributions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(c => (
                <div key={c.id} className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="text-xs font-bold text-zinc-300 uppercase">{c.userName}</p>
                      <p className="text-[10px] text-zinc-500">{new Date(c.date).toLocaleString()}</p>
                    </div>
                    <p className="text-amber-500 font-black">{c.amount} {c.currency}</p>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Smartphone className="w-3 h-3 text-zinc-500" />
                    <p className="text-[10px] text-zinc-400 uppercase font-bold">{c.method}</p>
                  </div>
                  {c.status === 'En attente' && (
                    <div className="flex gap-2">
                      <Button onClick={() => handleApprovePayment(c.id)} className="flex-1 h-10 bg-green-600 text-[10px] font-bold uppercase">Valider</Button>
                      <Button onClick={() => handleRefutePayment(c.id)} variant="outline" className="flex-1 h-10 border-red-900 text-red-500 text-[10px] font-bold uppercase">Refuser</Button>
                    </div>
                  )}
                  {c.status !== 'En attente' && (
                    <div className={`text-center py-2 rounded-lg text-[10px] font-black uppercase ${c.status === 'Approuvé' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                      PAIEMENT {c.status}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-20 text-zinc-700">Aucun paiement enregistré</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// --- PAYMENT COMPONENT ---
const PaymentFlow: React.FC<{
  user: User,
  onBack: () => void,
  onComplete: (c: Contribution) => void
}> = ({ user, onBack, onComplete }) => {
  const [method, setMethod] = useState<'Airtel Money' | 'Orange Money' | 'M-Pesa'>('M-Pesa');
  const [currency, setCurrency] = useState<'USD' | 'CDF'>('USD');
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePay = () => {
    if (!amount || parseFloat(amount) <= 0) return toast.error("Montant invalide");
    setLoading(true);
    
    // Simulate payment process
    setTimeout(() => {
      const newContrib: Contribution = {
        id: Math.random().toString(36).substr(2, 9),
        userId: user.id,
        userName: user.fullName,
        amount: parseFloat(amount),
        currency,
        method,
        status: 'En attente',
        date: new Date().toISOString()
      };
      onComplete(newContrib);
      setLoading(false);
      toast.success("Paiement envoyé pour validation !");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <button onClick={onBack} className="text-zinc-500 flex items-center gap-2 mb-8">
        <ArrowLeft className="w-5 h-5" /> Retour
      </button>

      <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">FAIRE UNE <span className="text-amber-500">COTISATION</span></h2>
      <p className="text-zinc-500 text-sm mb-8">Soutenez les projets de l&apos;organisation</p>

      <div className="space-y-6">
        <div>
          <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-3">Opérateur</label>
          <div className="grid grid-cols-3 gap-3">
            {(['Airtel Money', 'Orange Money', 'M-Pesa'] as const).map((m) => (
              <button 
                key={m}
                onClick={() => setMethod(m)}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${method === m ? 'bg-amber-500 border-amber-500 text-black' : 'bg-zinc-900 border-zinc-800 text-zinc-400'}`}
              >
                <Smartphone className="w-6 h-6 mb-2" />
                <span className="text-[8px] font-black uppercase text-center leading-tight">{m}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-3">Devise & Montant</label>
          <div className="flex gap-2 mb-4">
            <button onClick={() => setCurrency('USD')} className={`flex-1 h-12 rounded-xl border font-black ${currency === 'USD' ? 'bg-amber-500 border-amber-500 text-black' : 'bg-zinc-900 border-zinc-800 text-zinc-500'}`}>USD ($)</button>
            <button onClick={() => setCurrency('CDF')} className={`flex-1 h-12 rounded-xl border font-black ${currency === 'CDF' ? 'bg-amber-500 border-amber-500 text-black' : 'bg-zinc-900 border-zinc-800 text-zinc-500'}`}>CDF (FC)</button>
          </div>
          <Input 
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="bg-zinc-950 border-zinc-800 h-20 text-center text-4xl font-black text-amber-500"
          />
        </div>

        <div className="bg-zinc-900/50 p-6 rounded-3xl border border-dashed border-zinc-800">
          <div className="flex justify-between text-xs mb-2">
            <span className="text-zinc-500 uppercase">Frais de transaction</span>
            <span className="text-zinc-300">0.00 {currency}</span>
          </div>
          <div className="flex justify-between font-black">
            <span className="text-zinc-500 uppercase">Total à payer</span>
            <span className="text-amber-500 text-xl">{amount || '0'} {currency}</span>
          </div>
        </div>

        <Button 
          disabled={loading}
          onClick={handlePay}
          className="w-full h-16 bg-amber-500 hover:bg-amber-600 text-black font-black text-lg rounded-2xl flex items-center justify-center gap-3 uppercase"
        >
          {loading ? 'Traitement...' : 'Confirmer le paiement'}
        </Button>
      </div>
    </div>
  );
};

// --- MAIN APP ---
export default function App() {
  const { 
    users, setUsers, 
    contributions, setContributions, 
    currentUser, setCurrentUser,
    addUser, addContribution
  } = useStorage();

  const [view, setView] = useState<'landing' | 'login' | 'signup' | 'member' | 'admin' | 'payment'>('landing');

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    setView('member');
  };

  const handlePaymentComplete = (c: Contribution) => {
    addContribution(c);
    setView('member');
  };

  return (
    <div className="max-w-md mx-auto bg-black min-h-screen relative font-sans">
      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <LandingPage 
            key="landing"
            onJoin={() => setView('signup')} 
            onLogin={() => setView('login')} 
            onAdmin={() => setView('admin')} 
          />
        )}

        {view === 'signup' && (
          <Auth 
            key="signup"
            mode="signup" 
            onBack={() => setView('landing')} 
            onSuccess={handleAuthSuccess}
            users={users}
            addUser={addUser}
          />
        )}

        {view === 'login' && (
          <Auth 
            key="login"
            mode="login" 
            onBack={() => setView('landing')} 
            onSuccess={handleAuthSuccess}
            users={users}
            addUser={addUser}
          />
        )}

        {view === 'member' && currentUser && (
          <MemberSpace 
            key="member"
            user={currentUser} 
            onLogout={() => { setCurrentUser(null); setView('landing'); }}
            contributions={contributions}
            onPay={() => setView('payment')}
          />
        )}

        {view === 'payment' && currentUser && (
          <PaymentFlow 
            key="payment"
            user={currentUser} 
            onBack={() => setView('member')} 
            onComplete={handlePaymentComplete}
          />
        )}

        {view === 'admin' && (
          <AdminSpace 
            key="admin"
            users={users} 
            setUsers={setUsers}
            contributions={contributions} 
            setContributions={setContributions}
            onLogout={() => setView('landing')} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}