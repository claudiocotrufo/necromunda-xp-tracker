import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Tabs, { type TabId } from './components/Tabs';
import GangsTab from './components/GangsTab';
import GangModal from './components/GangModal';
import BattleModal from './components/BattleModal';
import BattleTab from './components/BattleTab';
import HistoryTab from './components/HistoryTab';
import Footer from './components/Footer';
import { useLocalStorageState } from './hooks/useLocalStorageState';
import { calcXP } from './utils/xp';
import { sanitizeName } from './utils/text';
import type { BattleCounterField, BattleToggleField, NewBattleInput, TrackerData } from './types';

const EMPTY_STATE: TrackerData = { gangs: [], battles: [], activeBattle: null };

function App() {
  const [data, setData] = useLocalStorageState<TrackerData>('n26_tracker', EMPTY_STATE);
  const [activeTab, setActiveTab] = useState<TabId>('gangs');
  const [selectedGangId, setSelectedGangId] = useState<number | null>(null);
  const [showBattleModal, setShowBattleModal] = useState(false);

  const { gangs, battles, activeBattle } = data;
  const selectedGang = gangs.find((g) => g.id === selectedGangId) || null;

  function addGang(name: string) {
    const clean = sanitizeName(name);
    if (!clean) return;
    setData((prev) => ({
      ...prev,
      gangs: [...prev.gangs, { id: Date.now(), name: clean, fighters: [], createdAt: new Date().toLocaleDateString('en-GB') }],
    }));
  }

  function deleteGang(id: number) {
    setData((prev) => ({ ...prev, gangs: prev.gangs.filter((g) => g.id !== id) }));
  }

  function openGang(id: number) {
    setData((prev) => ({
      ...prev,
      gangs: prev.gangs.map((g) => (g.id === id ? { ...g, fighters: g.fighters.map((f) => ({ ...f, selected: false })) } : g)),
    }));
    setSelectedGangId(id);
  }

  function closeGangModal() {
    setSelectedGangId(null);
  }

  function addFighter(name: string) {
    const clean = sanitizeName(name);
    if (!clean) return;
    setData((prev) => ({
      ...prev,
      gangs: prev.gangs.map((g) =>
        g.id === selectedGangId ? { ...g, fighters: [...g.fighters, { id: Date.now(), name: clean, selected: false }] } : g
      ),
    }));
  }

  function deleteFighter(fighterId: number) {
    setData((prev) => ({
      ...prev,
      gangs: prev.gangs.map((g) =>
        g.id === selectedGangId ? { ...g, fighters: g.fighters.filter((f) => f.id !== fighterId) } : g
      ),
    }));
  }

  function toggleFighter(fighterId: number) {
    setData((prev) => ({
      ...prev,
      gangs: prev.gangs.map((g) =>
        g.id === selectedGangId
          ? { ...g, fighters: g.fighters.map((f) => (f.id === fighterId ? { ...f, selected: !f.selected } : f)) }
          : g
      ),
    }));
  }

  function openBattleModal() {
    setShowBattleModal(true);
  }

  function closeBattleModal() {
    setShowBattleModal(false);
  }

  function confirmBattle({ name, campaign, opponent, scenario }: NewBattleInput) {
    const gang = gangs.find((g) => g.id === selectedGangId);
    if (!gang) return;
    const selected = gang.fighters.filter((f) => f.selected);
    const battle = {
      id: Date.now(),
      name,
      campaign,
      opponent,
      scenario,
      gangId: gang.id,
      gangName: gang.name,
      date: new Date().toLocaleDateString('en-GB'),
      fighters: selected.map((f) => ({
        id: f.id,
        name: f.name,
        participated: true,
        seriouslyInjured: 0,
        outOfAction: 0,
        outOfActionChampion: 0,
        assistance: 0,
        mentor: 0,
        objective: false,
      })),
    };
    setData((prev) => ({ ...prev, activeBattle: battle }));
    setShowBattleModal(false);
    setSelectedGangId(null);
    setActiveTab('battle');
  }

  function updateBattleFighter(fighterId: number, field: BattleCounterField | BattleToggleField, value: number | boolean) {
    setData((prev) => {
      if (!prev.activeBattle) return prev;
      return {
        ...prev,
        activeBattle: {
          ...prev.activeBattle,
          fighters: prev.activeBattle.fighters.map((f) =>
            f.id === fighterId
              ? { ...f, [field]: field === 'participated' || field === 'objective' ? value : Math.max(0, value as number) }
              : f
          ),
        },
      };
    });
  }

  function finalizeBattle() {
    setData((prev) => {
      if (!prev.activeBattle) return prev;
      const finished = {
        ...prev.activeBattle,
        fighters: prev.activeBattle.fighters.map((f) => ({ ...f, earnedXP: calcXP(f) })),
        finalized: true as const,
        finalizedAt: new Date().toLocaleDateString('en-GB'),
      };
      return { ...prev, battles: [...prev.battles, finished], activeBattle: null };
    });
  }

  function cancelBattle() {
    setData((prev) => ({ ...prev, activeBattle: null }));
  }

  function deleteBattleRecord(id: number) {
    setData((prev) => ({ ...prev, battles: prev.battles.filter((b) => b.id !== id) }));
  }

  function resetAll() {
    setData(EMPTY_STATE);
    setSelectedGangId(null);
    setShowBattleModal(false);
    setActiveTab('gangs');
  }

  return (
    <>
      <Header activeBattle={activeBattle} />

      <div className="container">
        <Tabs active={activeTab} onChange={setActiveTab} />

        {activeTab === 'gangs' && (
          <GangsTab gangs={gangs} onAddGang={addGang} onOpenGang={openGang} onDeleteGang={deleteGang} />
        )}

        {activeTab === 'battle' && (
          <BattleTab
            activeBattle={activeBattle}
            onUpdateFighter={updateBattleFighter}
            onFinalize={finalizeBattle}
            onCancel={cancelBattle}
          />
        )}

        {activeTab === 'history' && (
          <HistoryTab battles={battles} onDeleteBattle={deleteBattleRecord} />
        )}
      </div>

      <Footer onReset={resetAll} />

      {selectedGang && !showBattleModal && (
        <GangModal
          gang={selectedGang}
          onClose={closeGangModal}
          onAddFighter={addFighter}
          onDeleteFighter={deleteFighter}
          onToggleFighter={toggleFighter}
          onStartBattle={openBattleModal}
        />
      )}

      {showBattleModal && <BattleModal onConfirm={confirmBattle} onCancel={closeBattleModal} />}
    </>
  );
}

export default App;
