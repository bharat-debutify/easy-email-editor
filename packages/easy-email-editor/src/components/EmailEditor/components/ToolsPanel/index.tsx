import { Stack } from '@/components/UI/Stack';
import React from 'react';
import { useBlock } from '@/hooks/useBlock';
import { IconFont } from '@/components/IconFont';
import { Button } from '@/components/UI/Button';

export function ToolsPanel() {
  const { redo, undo, redoable, undoable } = useBlock();

  return (
    <Stack>
      <Button
        title={t('undo')}
        disabled={!undoable}
        onClick={undo}
        noBorder
      >
        <svg
          width='24'
          height='24'
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          style={{ paddingBottom: '3px' }}
        >
          <path
            d='M5.44231 3.5L3.25 5.69231L5.44231 7.88462M3.61538 5.69232H9.46154C11.2777 5.69232 12.75 7.16462 12.75 8.98078C12.75 10.797 11.2777 12.2692 9.46154 12.2692H3.61538'
            stroke='black'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </svg>
      </Button>
      <Button
        title={t('redo')}
        disabled={!redoable}
        onClick={redo}
        noBorder
      >
        <svg
          width='24'
          height='24'
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          style={{ paddingBottom: '3px' }}
        >
          <path
            d='M10.5577 3.5L12.75 5.69231L10.5577 7.88462M12.3846 5.69232H6.53846C4.72229 5.69232 3.25 7.16462 3.25 8.98078C3.25 10.797 4.72229 12.2692 6.53846 12.2692H12.3846'
            stroke='black'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </Button>
      <Stack.Item />
    </Stack>
  );
}
