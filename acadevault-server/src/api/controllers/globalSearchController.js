import { catchAsyncErrors } from '../../utils/catchAsyncErrors.js';
import {
  getAutoCompleteSuggestions,
  getRelatedSearchSuggestions,
  globalSearch,
} from '../../services/globalSearchService.js';

export const globalSearchController = catchAsyncErrors(async (req, res) => {
  const { results, metadata } = await globalSearch(req.query);

  res.status(200).json({
    status: 'success',
    results: results.length,
    metadata,
    data: results,
  });
});

export const autoCompleteController = catchAsyncErrors(async (req, res) => {
  const { search } = req.query;

  const suggestions = await getAutoCompleteSuggestions(search);

  res.status(200).json({
    status: 'success',
    count: suggestions.length,
    data: suggestions,
  });
});

export const relatedSearchController = catchAsyncErrors(async (req, res) => {
  const { search } = req.query;

  const suggestions = await getRelatedSearchSuggestions(search);

  res.status(200).json({
    status: 'success',
    count: suggestions.length,
    data: suggestions,
  });
});
