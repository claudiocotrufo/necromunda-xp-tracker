export function calcXP(fighter) {
  let xp = 0;
  if (fighter.participated) xp += 1;
  xp += (fighter.seriouslyInjured || 0) * 1;
  xp += (fighter.outOfAction || 0) * 2;
  xp += (fighter.outOfActionChampion || 0) * 3;
  xp += (fighter.assistance || 0) * 1;
  xp += (fighter.mentor || 0) * 1;
  if (fighter.objective) xp += 1;
  return xp;
}
