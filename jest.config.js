module.exports = {
	roots: ['<rootDir>'],
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
		'.+\\.(css|styl|less|sass|scss|svg)$': '<rootDir>/libs/mock.ts',
	},
	moduleNameMapper: {
		'@/(.*)$': '<rootDir>/$1',
	}
}