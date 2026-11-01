import { elementById, inputById } from './rtwPage';
import { newRtwState, type RtwState } from './rtwState';
import { refreshProgress } from './rtwProgress';
import { wireSteps } from './rtwSteps';
import { missingAnswers } from './rtwValidation';
import { readRecord } from './rtwRecord';
import { registerLogEntry, registerRow } from './rtwRegister';
import { showResultBanner, showSummary } from './rtwResult';
import { createRegisterLog } from './rtwRegisterLog';
import { copyRow } from './rtwCopyRow';

function generateEntry(state: RtwState, saveToLog: (entries: Record<string, unknown>[]) => void) {
	const errs = missingAnswers(state);
	if (errs.length) {
		alert('Before generating: ' + errs.join('; ') + '.');
		return;
	}
	const record = readRecord(state);
	inputById('rowOutput').value = registerRow(state, record);
	showResultBanner(record);
	showSummary(state, record);
	saveToLog([registerLogEntry(state, record)]);
	const result = elementById('result');
	result.classList.remove('hidden');
	result.scrollIntoView({ behavior: 'smooth' });
}

export function startRtwCheckTool() {
	const state = newRtwState();
	const refresh = () => refreshProgress(state);
	wireSteps(state, refresh);
	const saveToLog = createRegisterLog();
	elementById('generateBtn').onclick = () => generateEntry(state, saveToLog);
	elementById('copyBtn').onclick = copyRow;
}
