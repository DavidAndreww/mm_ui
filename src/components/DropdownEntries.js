import React from 'react';
import { makeStyles } from '@material-ui/core/styles'

export const DropdownEntries = (entries) => {
  entries.map(entry => {
    return {
      value: entry.payer,
      label: entry.payer
    }
  })
  return []
}