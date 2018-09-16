// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import type { State } from '../../types/state';
import type { DispatchType } from '../../types';
import type { SequenceType } from '../../types/sequence';
import Sequences from '../../components/MailAccountCreate/WizardChildren/sequences';
import {
  createSequenceRequest,
  deleteSequenceRequest,
  getSequenceRequest,
  updateSequenceRequest
} from './actions';

const mapStateToProps = (state: State) => ({
  isLoading: state.Sequence.isLoading,
  isFailure: state.Sequence.isFailure,
  errorMessage: state.Sequence.errorMessage,
  sequences: state.Sequence.sequences
});

const mapDispatchToProps = (dispatch: DispatchType) => ({
  startCreateSequence(sequence: SequenceType) {
    dispatch(createSequenceRequest(sequence));
  },
  startUpdateSequence(sequence: SequenceType) {
    dispatch(updateSequenceRequest(sequence));
  },
  startGetSequence() {
    dispatch(getSequenceRequest());
  },
  startDeleteSequence(sequence: SequenceType) {
    dispatch(deleteSequenceRequest(sequence));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Sequences);
