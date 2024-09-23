export const STATES = [
  'bg_start',
  'bg_001', // 誰もいない
  'bg_002', // 自分
  'bg_003', // 自分, ごまもち
  'bg_004', // 自分, ごまもち(ひざ)
  'bg_005', // 自分, どらやき
  'bg_006', // 自分, どらやき(ひざ)
  'bg_007', // 自分, フマンジュ
  'bg_008', // 自分, フマンジュ(ひざ)
  'bg_009', // 自分, のりお
  'bg_010', // 自分, のりお(ひざ)
  'bg_end',
] as const
export type State = (typeof STATES)[number]
