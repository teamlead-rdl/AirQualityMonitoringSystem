import React from 'react';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Stack from '@mui/material/Stack';

function MeasureUnit({
  measureUnit, index, removeMeasureUnits, updateMeasureUnits,
}) {
  return (
    <Grid container>
      <Grid xs={6} md={4}>
        <div className="task">
          <div>
            {/* eslint-disable-next-line */}
            <label>Unit:</label>
            <p className="measureUnit">{measureUnit.unitLabel}</p>
          </div>
        </div>
      </Grid>

      <Grid xs={6} md={5}>
        <div className="task">
          <div>
            {/* eslint-disable-next-line */}
            <label>Measure:</label>
            <p className="measureUnit">{measureUnit.unitMeasure}</p>
          </div>
        </div>
      </Grid>
      <Grid xs={6} md={2}>
        <div className="task">
          <Stack direction="row" spacing={2}>
            <EditIcon
              style={{ cursor: 'pointer' }}
              onClick={() => {
                updateMeasureUnits(index);
              }}
            />
            <DeleteIcon
              style={{ cursor: 'pointer' }}
              onClick={() => {
                removeMeasureUnits(index);
              }}
            />
          </Stack>
        </div>
      </Grid>
    </Grid>
  );
}

export default MeasureUnit;
