type ProgramArgsPrograms = 'markdown-file' | 'folder' | 'iframe';

interface ProgramArgs {
	title: string,
	programType: ProgramArgsPrograms,
}

export interface FolderProgramArgs extends ProgramArgs {
	programType: 'folder',
	childIcons: AnyProgramArgs[];
}

export interface MarkdownFileProgramArgs extends ProgramArgs {
	programType: 'markdown-file',
	url: string,
}

export interface IFrameProgramArgs extends ProgramArgs {
	programType: 'iframe',
	url: string,
}

export function isProgramFolder (program: AnyProgramArgs): program is FolderProgramArgs {
	return program.programType === 'folder';
}

export function isProgramIFrame (program: AnyProgramArgs): program is IFrameProgramArgs {
	return program.programType === 'iframe';
}

export function isProgramMarkdownFile (program: AnyProgramArgs): program is MarkdownFileProgramArgs {
	return program.programType === 'markdown-file';
}

export type AnyProgramArgs = FolderProgramArgs | MarkdownFileProgramArgs | IFrameProgramArgs;
