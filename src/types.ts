export interface Fighter {
  id: number;
  name: string;
  selected?: boolean;
}

export interface Gang {
  id: number;
  name: string;
  fighters: Fighter[];
  createdAt: string;
}

export interface Scenario {
  deployment: string;
  objective: string;
  sideJob: string;
  crew: string;
}

export interface BattleFighter {
  id: number;
  name: string;
  participated: boolean;
  seriouslyInjured: number;
  outOfAction: number;
  outOfActionChampion: number;
  assistance: number;
  mentor: number;
  objective: boolean;
  earnedXP?: number;
}

export type BattleCounterField = 'seriouslyInjured' | 'outOfAction' | 'outOfActionChampion' | 'assistance' | 'mentor';
export type BattleToggleField = 'participated' | 'objective';
export type BattleFighterField = BattleCounterField | BattleToggleField;

export interface ActiveBattle {
  id: number;
  name: string;
  campaign: string;
  opponent: string;
  scenario: Scenario;
  gangId: number;
  gangName: string;
  date: string;
  fighters: BattleFighter[];
}

export interface FinishedBattle extends ActiveBattle {
  finalized: true;
  finalizedAt: string;
}

export interface TrackerData {
  gangs: Gang[];
  battles: FinishedBattle[];
  activeBattle: ActiveBattle | null;
}

export interface NewBattleInput {
  name: string;
  campaign: string;
  opponent: string;
  scenario: Scenario;
}
